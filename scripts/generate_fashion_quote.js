const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function generateQuote() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set');
    return;
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: 'Escribe una frase motivadora sobre la moda y el arte',
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('🧠 Respuesta del modelo:', response.data.choices[0].message.content);
  } catch (error) {
    console.error(
      '❌ Error al llamar a la API:',
      error.response?.data || error.message
    );
  }
}

if (require.main === module) {
  generateQuote();
}

module.exports = generateQuote;
