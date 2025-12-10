from flask import Flask, request, jsonify
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")
app = Flask(__name__)

@app.route('/crear', methods=['POST'])
def crear():
    d = request.json
    prompt = f"TryOnMe: {d['email']} – medidas: {d['altura']}/{d['pecho']}/{d['cintura']}/{d['cadera']}"
    r = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "Generador de perfiles TryOnMe"}, {"role": "user", "content": prompt}]
    )
    c = r["choices"][0]["message"]["content"]
    os.makedirs('perfiles', exist_ok=True)
    with open(f"perfiles/{d['email']}.txt", "w", encoding='utf-8') as f:
        f.write(c)
    return jsonify({"respuesta": c})

@app.route('/buscar', methods=['POST'])
def buscar():
    email = request.json['email'].strip().lower()
    try:
        with open(f"perfiles/{email}.txt", "r", encoding='utf-8") as f:
            return jsonify({"respuesta": f.read()})
    except FileNotFoundError:
        return jsonify({"respuesta": "Este usuario aún no ha creado su TryOnMe."})

if __name__ == '__main__':
    app.run(debug=True)
