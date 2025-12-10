from flask import Flask, request, jsonify

from core.analytics import count_titles_with_word

app = Flask(__name__)
@app.route('/', methods=['POST'])
def process():
    payload = request.get_json(force=True) or {}
    word = request.args.get('word', 'Post')
    count = count_titles_with_word(payload, word)
    return jsonify({'count': count})
