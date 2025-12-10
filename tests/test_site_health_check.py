from scripts import site_health_check
from scripts.site_health_check import check_site, send_email


def test_check_site_success(monkeypatch):
    class FakeResponse:
        status_code = 200
    monkeypatch.setattr(site_health_check.requests, 'get', lambda url, timeout=10: FakeResponse())
    assert check_site('http://example.com') is True


def test_send_email(monkeypatch):
    sent = {}

    class FakeSMTP:
        def __init__(self, host, port):
            sent['host'] = host
            sent['port'] = port
        def starttls(self):
            pass
        def login(self, user, pwd):
            sent['user'] = user
            sent['pwd'] = pwd
        def send_message(self, msg):
            sent['msg'] = msg.get_payload()
        def __enter__(self):
            return self
        def __exit__(self, exc_type, exc, tb):
            pass

    monkeypatch.setattr(site_health_check, 'NOTIFY_EMAIL', 'test@example.com')
    monkeypatch.setattr(site_health_check, 'SMTP_HOST', 'smtp.test')
    monkeypatch.setattr(site_health_check, 'SMTP_USER', 'user')
    monkeypatch.setattr(site_health_check, 'SMTP_PASS', 'pass')
    monkeypatch.setattr(site_health_check, 'SMTP_PORT', 587)
    monkeypatch.setattr('smtplib.SMTP', FakeSMTP)

    send_email('down')
    assert sent['msg'] == 'down'
