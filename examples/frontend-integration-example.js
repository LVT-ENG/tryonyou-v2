/**
 * Example frontend integration using fetch to call the ChatGPT endpoint
 * This can be used in a browser or with Node.js fetch
 */

// Example 1: Simple chat interface
async function askChatGPT(prompt) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    
    if (data.success) {
      return data.response;
    } else {
      console.error('Error:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}

// Example 2: Code review interface
async function requestCodeReview(code) {
  try {
    const response = await fetch('/api/code-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    return data.review || null;
  } catch (error) {
    console.error('Error requesting code review:', error);
    return null;
  }
}

// Example usage in a web page:
// HTML:
// <div id="chat-container">
//   <textarea id="prompt-input" placeholder="Escribe tu pregunta..."></textarea>
//   <button id="ask-button">Preguntar</button>
//   <div id="response-output"></div>
// </div>

// JavaScript:
document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('prompt-input');
  const askButton = document.getElementById('ask-button');
  const responseOutput = document.getElementById('response-output');

  askButton?.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
      alert('Por favor, escribe una pregunta');
      return;
    }

    // Show loading state
    responseOutput.textContent = 'Pensando...';
    askButton.disabled = true;

    // Get response from ChatGPT
    const response = await askChatGPT(prompt);

    // Display response
    if (response) {
      responseOutput.textContent = response;
    } else {
      responseOutput.textContent = 'Error al obtener respuesta. Por favor, intenta de nuevo.';
    }

    askButton.disabled = false;
  });
});

// Example 3: Direct API call without server (using API key - NOT RECOMMENDED for frontend)
// This should only be used in backend/Node.js environments
async function directChatGPTCall(prompt, apiKey) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Eres un asistente experto en programación.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    
    // Validate response structure
    if (data && data.choices && data.choices.length > 0 && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      console.error('Invalid response structure:', data);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Export functions for use in other modules (ES module syntax)
export { askChatGPT, requestCodeReview, directChatGPTCall };
