import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import csvParser from 'csv-parser';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function cargarCatalogo(csvPath = 'products/tryon-products.csv') {
  return new Promise((resolve) => {
    const productos = [];
    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (row) => productos.push(row))
      .on('end', () => resolve(productos));
  });
}

async function crearTryOnMe(usuario) {
  const productos = await cargarCatalogo();
  const prompt = `
Usuario: ${usuario.nombre} (${usuario.email})
Medidas: Altura ${usuario.altura}, Pecho ${usuario.pecho}, Cintura ${usuario.cintura}, Cadera ${usuario.cadera}
Tipo: ${usuario.tipoCuerpo}, Prenda antigua: ${usuario.prendaAntigua}
Cat\u00E1logo:
${productos.slice(0, 5).map(p => `- ${p.name || p.Titulo} (${p.Talla || ''})`).join('\n')}

Devuelve: Avatar Cray\u00F3n, recomendaci\u00F3n, comentario de Pau, y estado AutoDonate.
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Asistente TryOnMe' },
      { role: 'user', content: prompt }
    ]
  });

  const resultado = res.choices[0].message.content;
  fs.mkdirSync('perfiles', { recursive: true });
  fs.writeFileSync(`perfiles/${usuario.email}.txt`, resultado);
  console.log('\u2705 Perfil generado para:', usuario.email);
}

crearTryOnMe({
  nombre: 'Rub\u00E9n',
  email: 'rubenespi@example.com',
  altura: 190,
  pecho: 100,
  cintura: 76,
  cadera: 94,
  tipoCuerpo: 'atl\u00E9tico',
  prendaAntigua: 'vaquero deste\u00F1ido'
});
