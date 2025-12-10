import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Sends a prompt to ChatGPT and returns the response
 * @param {string} prompt - The user prompt to send to ChatGPT
 * @returns {Promise<string|null>} The response from ChatGPT or null if error
 */
async function getChatGPTResponse(prompt) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Eres un asistente experto en programación.' },
          { role: 'user', content: prompt }
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error al comunicarse con ChatGPT:', error);
    return null;
  }
}

export default getChatGPTResponse;
export { getChatGPTResponse };
