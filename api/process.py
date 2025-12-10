from flask import Flask, request, jsonify
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

@app.route('/api/process', methods=['POST'])
def process():
    try:
        data = request.get_json()
        app.logger.info('[PROCESS] Data received: %s', data)
        usd_value = data.get('bpi', {}).get('USD', {}).get('rate', '0')
        app.logger.info('[PROCESS] USD rate extracted: %s', usd_value)
        return jsonify({ "usd": usd_value })
    except Exception as e:
        app.logger.error('[PROCESS] Error: %s', e)
        return jsonify({ "error": str(e) }), 500

