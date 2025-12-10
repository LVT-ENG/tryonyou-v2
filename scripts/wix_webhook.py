import os
from flask import Flask, request, abort
from twilio.rest import Client

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
WHATSAPP_FROM = os.getenv("WHATSAPP_FROM", "whatsapp:+14155238886")
TARGET_WHATSAPP = os.getenv("TARGET_WHATSAPP", "whatsapp:+33699469479")

if not (TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN):
    raise SystemExit("Twilio credentials are required")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
app = Flask(__name__)

@app.route('/wix-webhook', methods=['POST'])
def wix_webhook():
    if not request.is_json:
        abort(400, "Expected JSON")
    payload = request.get_json()
    message = client.messages.create(
        body=f"Wix site published: {payload}",
        from_=WHATSAPP_FROM,
        to=TARGET_WHATSAPP
    )
    return {"sid": message.sid}

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
