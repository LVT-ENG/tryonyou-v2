import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

/**
 * Ejecuta el sistema unificado TRYONME (avatar, recomendaci\u00f3n, Pau y AutoDonate).
 *
 * @param {Object} usuario - Datos b\u00e1sicos del usuario.
 * @returns {Promise<string>} Respuesta generada por OpenAI.
 */
export async function tryonmeSistemaCompleto(usuario) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
Eres el sistema inteligente de TRYONME. 
Tienes cuatro funciones integradas:
1. Crear un avatar con base en las medidas corporales.
2. Recomendar prendas de la colecci\u00f3n actual basadas en tipo de cuerpo.
3. Comentar la elecci\u00f3n con estilo emocional usando al asistente Pau el Pavo Real.
4. Activar la opci\u00f3n AutoDonate si el usuario rechaza una prenda vieja en mal estado.

Datos del usuario:
- Altura: ${usuario.altura} cm
- Pecho: ${usuario.pecho} cm
- Cintura: ${usuario.cintura} cm
- Cadera: ${usuario.cadera} cm
- Tipo de cuerpo: ${usuario.tipoCuerpo}
- Prenda vieja a evaluar: ${usuario.prendaAntigua}

Crea una salida organizada que incluya:
1. Avatar generado (breve descripci\u00f3n corporal)
2. Recomendaci\u00f3n ideal (prenda, color, corte)
3. Comentario emocional de Pau
4. Resultado de AutoDonate (Aceptar o Rechazar + acci\u00f3n)
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Eres el sistema unificado de TRYONME.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.75,
    max_tokens: 900,
  });

  return response.choices[0].message.content;
}

// Ejemplo de ejecuci\u00f3n directa
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  tryonmeSistemaCompleto({
    altura: 178,
    pecho: 95,
    cintura: 72,
    cadera: 96,
    tipoCuerpo: 'reloj de arena',
    prendaAntigua: 'vaquero desgastado con manchas',
  })
    .then((msg) => {
      console.log('\n\ud83e\udd16 Respuesta TRYONME:\n');
      console.log(msg);
    })
    .catch((err) => console.error('Error:', err));
}
