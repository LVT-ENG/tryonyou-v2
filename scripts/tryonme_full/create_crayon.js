import OpenAI from "openai";
import env from "../../env.js";
import fs from 'fs';
import csvParser from 'csv-parser';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

function cargarCatalogo() {
  return new Promise(resolve => {
    const productos = [];
    fs.createReadStream('catalogo.csv')
      .pipe(csvParser())
      .on('data', row => productos.push(row))
      .on('end', () => resolve(productos));
  });
}

export async function crearTryOnMe(usuario) {
  const productos = await cargarCatalogo();
  const prompt = `Usuario: ${usuario.nombre} (${usuario.email})\nMedidas: Altura ${usuario.altura}, Pecho ${usuario.pecho}, Cintura ${usuario.cintura}, Cadera ${usuario.cadera}\nTipo: ${usuario.tipoCuerpo}, Prenda antigua: ${usuario.prendaAntigua}\nCat\u00e1logo:\n${productos.slice(0,5).map(p => `- ${p.Titulo} (${p.Talla})`).join('\n')}\n\nGenera: descripci\u00f3n avatar, recomendaci\u00f3n, comentario de Pau, y resultado AutoDonate.`;

  const r = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Asistente TryOnMe para crear Cray\u00f3n inteligente." },
      { role: "user", content: prompt }
    ]
  });

  const out = r.choices[0].message.content;
  fs.writeFileSync(`perfiles/${usuario.email}.txt`, out);
  return out;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [nombre, email, altura, pecho, cintura, cadera, tipoCuerpo, prendaAntigua] = process.argv.slice(2);
  crearTryOnMe({ nombre, email, altura, pecho, cintura, cadera, tipoCuerpo, prendaAntigua }).then(c => console.log(c));
}
