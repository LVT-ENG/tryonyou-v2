import os
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
import requests
from dotenv import load_dotenv

load_dotenv()

SITE_URL = os.getenv('SITE_URL', 'https://tryonyou.app')
NOTIFY_EMAIL = os.getenv('NOTIFY_EMAIL')
SMTP_HOST = os.getenv('SMTP_HOST')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')


def check_site(url: str) -> bool:
    try:
        response = requests.get(url, timeout=10)
        return response.status_code == 200
    except requests.RequestException:
        return False


def send_email(msg: str) -> None:
    if not (SMTP_HOST and SMTP_USER and SMTP_PASS and NOTIFY_EMAIL):
        print('Email configuration missing; cannot send notification')
        return
    message = MIMEText(msg)
    message['Subject'] = 'TryOnMe Health Check Alert'
    message['From'] = formataddr(('TryOnMe Bot', SMTP_USER))
    message['To'] = NOTIFY_EMAIL
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(message)


def main() -> None:
    ok = check_site(SITE_URL)
    if not ok:
        send_email(f'Site unreachable: {SITE_URL}')
    else:
        print(f'Site {SITE_URL} is healthy')


if __name__ == '__main__':
    main()
