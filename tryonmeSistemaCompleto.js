import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function tryonmeSistemaCompleto(usuario) {
  const prompt = `
Eres el sistema inteligente de TRYONME. 
Tienes cuatro funciones integradas:
1. Crear un avatar con base en las medidas corporales.
2. Recomendar prendas de la colección actual basadas en tipo de cuerpo.
3. Comentar la elección con estilo emocional usando al asistente Pau el Pavo Real.
4. Activar la opción AutoDonate si el usuario rechaza una prenda vieja en mal estado.

Datos del usuario:
- Altura: ${usuario.altura} cm
- Pecho: ${usuario.pecho} cm
- Cintura: ${usuario.cintura} cm
- Cadera: ${usuario.cadera} cm
- Tipo de cuerpo: ${usuario.tipoCuerpo}
- Prenda vieja a evaluar: ${usuario.prendaAntigua}

Crea una salida organizada que incluya:
1. Avatar generado (breve descripción corporal)
2. Recomendación ideal (prenda, color, corte)
3. Comentario emocional de Pau
4. Resultado de AutoDonate (Aceptar o Rechazar + acción)
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Eres el sistema unificado de TRYONME." },
      { role: "user", content: prompt }
    ],
    temperature: 0.75,
    max_tokens: 900
  });

  console.log("\n🧠 Respuesta TRYONME:\n");
  console.log(response.choices[0].message.content);
}

tryonmeSistemaCompleto({
  altura: 178,
  pecho: 95,
  cintura: 72,
  cadera: 96,
  tipoCuerpo: "reloj de arena",
  prendaAntigua: "vaquero desgastado con manchas"
});
