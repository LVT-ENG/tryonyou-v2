#!/bin/bash
# Schedule hourly site health check
cd "$(dirname "$0")"/..
PROJECT_ROOT="$(pwd)"
mkdir -p logs
CRON_ENTRY="0 * * * * python3 $PROJECT_ROOT/scripts/site_health_check.py >> $PROJECT_ROOT/logs/health.log 2>&1"
(crontab -l 2>/dev/null | grep -F -x "$CRON_ENTRY") >/dev/null 2>&1
if [ $? -ne 0 ]; then
    (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -
fi
