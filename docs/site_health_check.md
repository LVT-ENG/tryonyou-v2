# Site Health Check

`scripts/site_health_check.py` tests if the main site URL is reachable. If the check fails and email credentials are set, an alert is sent automatically.

## Usage
```bash
python scripts/site_health_check.py
```

Set `SITE_URL`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` and `NOTIFY_EMAIL` in your environment to enable email notifications.
