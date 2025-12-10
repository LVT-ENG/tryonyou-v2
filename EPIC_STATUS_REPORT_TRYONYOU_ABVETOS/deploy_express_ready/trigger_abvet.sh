#!/bin/bash
###############################################################################
# ABVETOS Deployment Trigger Script
# 
# Purpose: Automated Build, Verification, Environment Testing, Optimization,
#          and Status reporting for TRYONYOU application
#
# Usage: ./trigger_abvet.sh [environment] [options]
#
# Environments: dev, staging, production
# Options: --skip-tests, --force, --notify, --verbose
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENVIRONMENT="${1:-staging}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="$SCRIPT_DIR/deploy_${ENVIRONMENT}_${TIMESTAMP}.log"

# Parse options
SKIP_TESTS=false
FORCE_DEPLOY=false
NOTIFY=false
VERBOSE=false

for arg in "${@:2}"; do
    case $arg in
        --skip-tests)
            SKIP_TESTS=true
            ;;
        --force)
            FORCE_DEPLOY=true
            ;;
        --notify)
            NOTIFY=true
            ;;
        --verbose)
            VERBOSE=true
            ;;
        *)
            echo -e "${RED}Unknown option: $arg${NC}"
            exit 1
            ;;
    esac
done

# Logging function
log() {
    local level=$1
    shift
    local message="$@"
    echo -e "[$(date +'%Y-%m-%d %H:%M:%S')] [$level] $message" | tee -a "$LOG_FILE"
}

log_info() {
    echo -e "${BLUE}[INFO]${NC} $@" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $@" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $@" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $@" | tee -a "$LOG_FILE"
}

# Banner
echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         ABVETOS - TRYONYOU Deployment Trigger            ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

log_info "Starting ABVETOS deployment for environment: $ENVIRONMENT"
log_info "Log file: $LOG_FILE"

# Step 1: Environment Validation
log_info "Step 1/7: Validating environment..."
cd "$PROJECT_ROOT"

if [ ! -f ".env" ]; then
    log_error ".env file not found!"
    exit 1
fi

if [ ! -f "package.json" ]; then
    log_error "package.json not found!"
    exit 1
fi

log_success "Environment validated"

# Step 2: Dependency Check
log_info "Step 2/7: Checking dependencies..."

if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed!"
    exit 1
fi

NODE_VERSION=$(node --version)
log_info "Node.js version: $NODE_VERSION"

if ! command -v npm &> /dev/null; then
    log_error "npm is not installed!"
    exit 1
fi

NPM_VERSION=$(npm --version)
log_info "npm version: $NPM_VERSION"

log_success "Dependencies checked"

# Step 3: Build Process
log_info "Step 3/7: Running build process..."

if [ "$VERBOSE" = true ]; then
    npm run build 2>&1 | tee -a "$LOG_FILE"
else
    npm run build >> "$LOG_FILE" 2>&1
fi

if [ $? -eq 0 ]; then
    log_success "Build completed successfully"
else
    log_error "Build failed!"
    exit 1
fi

# Step 4: Run Tests
if [ "$SKIP_TESTS" = false ]; then
    log_info "Step 4/7: Running test suite..."
    
    if [ "$VERBOSE" = true ]; then
        npm test 2>&1 | tee -a "$LOG_FILE"
    else
        npm test >> "$LOG_FILE" 2>&1
    fi
    
    if [ $? -eq 0 ]; then
        log_success "All tests passed"
    else
        log_error "Tests failed!"
        if [ "$FORCE_DEPLOY" = false ]; then
            exit 1
        else
            log_warning "Continuing deployment despite test failures (--force enabled)"
        fi
    fi
else
    log_warning "Step 4/7: Tests skipped (--skip-tests enabled)"
fi

# Step 5: Health Check
log_info "Step 5/7: Running health checks..."

if [ -f "scripts/site_health_check.py" ]; then
    python3 scripts/site_health_check.py >> "$LOG_FILE" 2>&1
    if [ $? -eq 0 ]; then
        log_success "Health checks passed"
    else
        log_warning "Health checks failed, but continuing deployment"
    fi
else
    log_warning "Health check script not found, skipping"
fi

# Step 6: Deploy
log_info "Step 6/7: Deploying to $ENVIRONMENT..."

case $ENVIRONMENT in
    dev)
        log_info "Development deployment - using local preview"
        npm run preview >> "$LOG_FILE" 2>&1 &
        DEV_PID=$!
        log_success "Development server started (PID: $DEV_PID)"
        ;;
    staging|production)
        if command -v vercel &> /dev/null; then
            if [ "$ENVIRONMENT" = "production" ]; then
                vercel --prod >> "$LOG_FILE" 2>&1
            else
                vercel >> "$LOG_FILE" 2>&1
            fi
            
            if [ $? -eq 0 ]; then
                log_success "Deployed to $ENVIRONMENT successfully"
            else
                log_error "Deployment to $ENVIRONMENT failed!"
                exit 1
            fi
        else
            log_error "Vercel CLI not found! Install with: npm i -g vercel"
            exit 1
        fi
        ;;
    *)
        log_error "Unknown environment: $ENVIRONMENT"
        exit 1
        ;;
esac

# Step 7: Status Report
log_info "Step 7/7: Generating status report..."

REPORT_DIR="$PROJECT_ROOT/EPIC_STATUS_REPORT_TRYONYOU_ABVETOS"
if [ -d "$REPORT_DIR" ]; then
    # Create a deployment history log instead of modifying summary.txt
    DEPLOY_HISTORY="$REPORT_DIR/deploy_express_ready/deployment_history.log"
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] Deployment to $ENVIRONMENT completed successfully" >> "$DEPLOY_HISTORY"
    log_success "Deployment history updated"
else
    log_warning "Status report directory not found"
fi

# Notification
if [ "$NOTIFY" = true ]; then
    log_info "Sending notification..."
    
    if [ -f "$REPORT_DIR/notify_telegram.txt" ]; then
        # TODO: Implement Telegram notification
        # Required environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
        # Example: curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        #          -d chat_id="${TELEGRAM_CHAT_ID}" -d text="$(cat $REPORT_DIR/notify_telegram.txt)"
        log_info "Notification prepared (requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID configuration)"
    fi
fi

# Final Summary
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              Deployment Completed Successfully!          ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
log_success "ABVETOS deployment finished"
log_info "Environment: $ENVIRONMENT"
log_info "Timestamp: $TIMESTAMP"
log_info "Log file: $LOG_FILE"
echo ""

exit 0
