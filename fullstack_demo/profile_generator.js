import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';
import csvParser from 'csv-parser';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function cargarProductos() {
  return new Promise((resolve) => {
    const productos = [];
    fs.createReadStream('productos.csv')
      .pipe(csvParser())
      .on('data', (row) => productos.push(row))
      .on('end', () => resolve(productos));
  });
}

export async function generarPerfilTryOnMe(usuario) {
  const productos = await cargarProductos();
  const prompt = `
Usuario: ${usuario.nombre} (${usuario.email})
Medidas: Altura ${usuario.altura}, Pecho ${usuario.pecho}, Cintura ${usuario.cintura}, Cadera ${usuario.cadera}
Tipo cuerpo: ${usuario.tipoCuerpo}, Prenda vieja: ${usuario.prendaAntigua}
Catálogo:
${productos.slice(0, 5).map(p => `- ${p.Titulo} (${p.Talla})`).join('\n')}

Genera: descripción del avatar (Crayón), sugerencia de prenda, comentario de Pau, y si la prenda vieja debe ser donada.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Sistema TryOnMe para creación de Crayón personalizado." },
      { role: "user", content: prompt }
    ]
  });

  const resultado = response.choices[0].message.content;
  fs.mkdirSync('perfiles', { recursive: true });
  fs.writeFileSync(`perfiles/${usuario.email}.txt`, resultado);
  return resultado;
}
