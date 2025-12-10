import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import types
from scripts.send_push import enviar_push


class FakeResponse:
    def __init__(self, status_code=200):
        self.status_code = status_code


def test_enviar_push(monkeypatch):
    captured = {}

    def fake_post(url, headers=None, json=None, timeout=10):
        captured['url'] = url
        captured['headers'] = headers
        captured['json'] = json
        return FakeResponse(202)

    monkeypatch.setattr('scripts.send_push.requests.post', fake_post)
    status = enviar_push('user_123', 'Hola', api_key='k', app_id='a')

    assert status == 202
    assert captured['url'] == 'https://onesignal.com/api/v1/notifications'
    assert captured['json']['include_external_user_ids'] == ['user_123']
    assert captured['json']['contents']['en'] == 'Hola'
