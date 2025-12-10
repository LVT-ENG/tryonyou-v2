import 'dotenv/config';
import { OpenAI } from 'openai';
import { fileURLToPath } from 'url';

async function generateQuote() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set');
    return;
  }

  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: 'Escribe una frase motivadora sobre la moda y el arte',
        },
      ],
      temperature: 0.7,
    });
    console.log('🧠 Respuesta del modelo:', response.choices[0].message.content);
  } catch (error) {
    console.error(
      '❌ Error al llamar a la API:',
      error.response?.data || error.message
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateQuote();
}

export default generateQuote;
