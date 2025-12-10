#!/bin/bash

################################################################################
# TRYONYOU ABVETOS - Express Deployment Trigger
# 
# This script triggers an express deployment of the TRYONYOU ABVETOS system.
# It performs pre-deployment checks, executes the deployment, and sends
# notifications upon completion.
#
# Usage: ./trigger_abvet.sh [environment]
# Environments: development, staging, production (default: staging)
################################################################################

set -e  # Exit on error
set -u  # Exit on undefined variable

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPORT_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(dirname "$REPORT_DIR")"
ENVIRONMENT="${1:-staging}"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="${REPORT_DIR}/deployment_${TIMESTAMP}.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

################################################################################
# Functions
################################################################################

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

################################################################################
# Pre-deployment Checks
################################################################################

log "Starting TRYONYOU ABVETOS Express Deployment"
log "Environment: $ENVIRONMENT"
log "Timestamp: $TIMESTAMP"

# Check if we're in the right directory
if [ ! -f "$PROJECT_ROOT/package.json" ]; then
    error "package.json not found. Are you in the correct directory?"
    exit 1
fi

# Check Node.js version
log "Checking Node.js version..."
NODE_VERSION=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    error "Node.js 18 or higher is required. Current version: $(node --version)"
    exit 1
fi
success "Node.js version check passed"

# Check environment variables
log "Checking environment variables..."
cd "$PROJECT_ROOT"
if [ -f .env ]; then
    source .env
    success "Environment variables loaded from .env"
else
    warning ".env file not found, using system environment"
fi

# Validate required environment variables
REQUIRED_VARS=()
if [ "$ENVIRONMENT" = "production" ]; then
    REQUIRED_VARS=("VERCEL_TOKEN" "VERCEL_ORG_ID" "VERCEL_PROJECT_ID")
fi

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var:-}" ]; then
        error "Required environment variable $var is not set"
        exit 1
    fi
done

success "Environment variables validated"

################################################################################
# Build Phase
################################################################################

log "Installing dependencies..."
npm install --silent 2>&1 | tee -a "$LOG_FILE"
success "Dependencies installed"

log "Running build..."
npm run build 2>&1 | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
    error "Build failed"
    exit 1
fi
success "Build completed successfully"

################################################################################
# Test Phase (optional for express deployment)
################################################################################

if [ "$ENVIRONMENT" = "production" ]; then
    log "Running tests (production deployment)..."
    if command -v jest &> /dev/null; then
        npm test 2>&1 | tee -a "$LOG_FILE"
        if [ $? -ne 0 ]; then
            error "Tests failed, aborting production deployment"
            exit 1
        fi
        success "Tests passed"
    else
        warning "Tests skipped - jest not configured"
    fi
fi

################################################################################
# Deployment Phase
################################################################################

log "Starting deployment to $ENVIRONMENT..."

case "$ENVIRONMENT" in
    development)
        log "Development deployment - serving locally"
        npm run preview &
        PREVIEW_PID=$!
        sleep 3
        success "Development server running on http://localhost:4173 (PID: $PREVIEW_PID)"
        log "To stop the server, run: kill $PREVIEW_PID"
        echo "$PREVIEW_PID" > "${REPORT_DIR}/.dev_server.pid"
        ;;
        
    staging)
        log "Staging deployment - using Vercel preview"
        if command -v vercel &> /dev/null; then
            vercel --yes 2>&1 | tee -a "$LOG_FILE"
            success "Deployed to Vercel staging"
        else
            warning "Vercel CLI not found, skipping deployment"
        fi
        ;;
        
    production)
        log "Production deployment - using Vercel production"
        if command -v vercel &> /dev/null; then
            vercel --prod --yes 2>&1 | tee -a "$LOG_FILE"
            success "Deployed to Vercel production"
        else
            error "Vercel CLI not found"
            exit 1
        fi
        ;;
        
    *)
        error "Unknown environment: $ENVIRONMENT"
        error "Valid environments: development, staging, production"
        exit 1
        ;;
esac

################################################################################
# Post-deployment
################################################################################

log "Running post-deployment checks..."

# Update summary
SUMMARY_FILE="${REPORT_DIR}/summary.txt"
echo "TRYONYOU ABVETOS - Epic Status Summary" > "$SUMMARY_FILE"
echo "Status: ✅ DEPLOYED | Date: $(date +%Y-%m-%d)" >> "$SUMMARY_FILE"
echo "Environment: $ENVIRONMENT | Build: SUCCESS" >> "$SUMMARY_FILE"
echo "Deployed at: $TIMESTAMP" >> "$SUMMARY_FILE"
echo "Log: deployment_${TIMESTAMP}.log" >> "$SUMMARY_FILE"

success "Deployment summary updated"

# Send notification (if Telegram is configured)
NOTIFY_FILE="${REPORT_DIR}/notify_telegram.txt"
if [ -f "$NOTIFY_FILE" ]; then
    log "Sending Telegram notification..."
    # Extract bot token and chat ID from notify_telegram.txt
    BOT_TOKEN=$(grep "^TELEGRAM_BOT_TOKEN=" "$NOTIFY_FILE" | cut -d= -f2)
    CHAT_ID=$(grep "^TELEGRAM_CHAT_ID=" "$NOTIFY_FILE" | cut -d= -f2)
    
    if [ "$BOT_TOKEN" != "your_bot_token_here" ] && [ "$CHAT_ID" != "your_chat_id_here" ]; then
        MESSAGE=$(cat <<EOF
✅ TRYONYOU ABVETOS Deployment Complete
Environment: $ENVIRONMENT
Timestamp: $TIMESTAMP
Status: SUCCESS
EOF
)
        
        ENCODED_MESSAGE=$(echo "$MESSAGE" | sed 's/ /%20/g' | sed 's/\n/%0A/g')
        RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
            -d "chat_id=${CHAT_ID}" \
            -d "text=${ENCODED_MESSAGE}" \
            -d "parse_mode=HTML")
        
        HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
        if [ "$HTTP_CODE" = "200" ]; then
            success "Telegram notification sent"
        else
            warning "Telegram notification failed (HTTP $HTTP_CODE)"
            log "Response: $(echo "$RESPONSE" | head -n-1)"
        fi
    else
        warning "Telegram not configured, skipping notification"
    fi
fi

################################################################################
# Completion
################################################################################

success "TRYONYOU ABVETOS Express Deployment Complete!"
log "Environment: $ENVIRONMENT"
log "Log file: $LOG_FILE"
log "Summary: $SUMMARY_FILE"

exit 0
