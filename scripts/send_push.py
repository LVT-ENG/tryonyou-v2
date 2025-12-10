import os
import argparse
import requests


def enviar_push(uid: str, mensaje: str, api_key: str | None = None, app_id: str | None = None) -> int:
    """Send a push notification using OneSignal.

    Parameters
    ----------
    uid: str
        External user ID to notify.
    mensaje: str
        Message content.
    api_key: str | None
        OneSignal REST API key. If ``None``, ``ONESIGNAL_API_KEY`` env var is used.
    app_id: str | None
        OneSignal App ID. If ``None``, ``ONESIGNAL_APP_ID`` env var is used.
    Returns
    -------
    int
        HTTP status code from OneSignal response.
    """
    api_key = api_key or os.environ.get("ONESIGNAL_API_KEY")
    app_id = app_id or os.environ.get("ONESIGNAL_APP_ID")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "app_id": app_id,
        "include_external_user_ids": [uid],
        "contents": {"en": mensaje},
        "headings": {"en": "Nueva recomendación de TRYONYOU"},
    }
    url = "https://onesignal.com/api/v1/notifications"
    response = requests.post(url, headers=headers, json=payload, timeout=10)
    print("Notification status:", response.status_code)
    return response.status_code


def main() -> None:
    parser = argparse.ArgumentParser(description="Send push notification via OneSignal")
    parser.add_argument("uid", help="User ID to send notification to")
    parser.add_argument("mensaje", help="Notification message")
    parser.add_argument("--api-key", dest="api_key", help="OneSignal REST API key")
    parser.add_argument("--app-id", dest="app_id", help="OneSignal App ID")
    args = parser.parse_args()
    enviar_push(args.uid, args.mensaje, api_key=args.api_key, app_id=args.app_id)


if __name__ == "__main__":
    main()
