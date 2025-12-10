from flask import Flask, request, jsonify

app = Flask(__name__)


def count_titles_with_word(data, word):
    posts = data.get('posts', [])
    return sum(
        1 for post in posts if word.lower() in post.get('title', '').lower()
    )


@app.route('/', methods=['POST'])
def process():
    payload = request.get_json(force=True) or {}
    word = request.args.get('word', 'Post')
    count = count_titles_with_word(payload, word)
    return jsonify({'count': count})
