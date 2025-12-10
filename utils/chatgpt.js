const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Sends a prompt to ChatGPT and retrieves the response.
 * @param {string} prompt - The user prompt to send to ChatGPT.
 * @param {object} options - Optional configuration.
 * @param {string} options.model - The model to use (default: 'gpt-4').
 * @param {string} options.apiKey - Override the API key from environment.
 * @returns {Promise<string|null>} The response content or null on error.
 */
async function getChatGPTResponse(prompt, options = {}) {
  const model = options.model || 'gpt-4';
  const apiKey = options.apiKey || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY is not configured');
    return null;
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Validate response structure
    if (!response.data?.choices?.[0]?.message?.content) {
      console.error('Error: Unexpected API response structure');
      return null;
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return null;
  }
}

module.exports = { getChatGPTResponse };
