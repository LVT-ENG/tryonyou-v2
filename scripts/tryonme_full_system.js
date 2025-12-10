import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';
import csvParser from 'csv-parser';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function cargarCatalogo() {
  return new Promise((resolve) => {
    const productos = [];
    fs.createReadStream('catalogo.csv')
      .pipe(csvParser())
      .on('data', (row) => productos.push(row))
      .on('end', () => resolve(productos));
  });
}

export async function crearTryOnMe(usuario) {
  const productos = await cargarCatalogo();
  const prompt = `Usuario: ${usuario.nombre} (${usuario.email})\nMedidas: Altura ${usuario.altura}, Pecho ${usuario.pecho}, Cintura ${usuario.cintura}, Cadera ${usuario.cadera}\nTipo: ${usuario.tipoCuerpo}, Prenda antigua: ${usuario.prendaAntigua}\nCat\u00E1logo:\n${productos.slice(0,5).map(p=>`- ${p.Titulo} (${p.Talla})`).join('\n')}\n\nGenera: descripci\u00F3n avatar, recomendaci\u00F3n, comentario de Pau, y resultado AutoDonate.`;

  const r = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Asistente TryOnMe para crear Cray\u00F3n inteligente." },
      { role: "user", content: prompt }
    ]
  });

  const out = r.choices[0].message.content;
  fs.writeFileSync(`perfiles/${usuario.email}.txt`, out);
  return out;
}
