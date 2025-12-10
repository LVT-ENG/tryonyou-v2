# ChatGPT API Integration

## Overview
This module provides a simple interface to interact with OpenAI's ChatGPT API using the GPT-4 model.

## Function: `getChatGPTResponse`

An async function that sends a prompt to ChatGPT and returns the response.

### Parameters
- `prompt` (string): The user prompt to send to ChatGPT

### Returns
- `Promise<string|null>`: The response from ChatGPT, or `null` if an error occurs

### Example Usage

```javascript
import getChatGPTResponse from './api/chatgpt.js';

// Example 1: Simple question
const response = await getChatGPTResponse('¿Cómo puedo crear una función async en JavaScript?');
console.log(response);

// Example 2: Code review request
const code = `
function calculateSum(a, b) {
  return a + b;
}
`;
const review = await getChatGPTResponse(`Por favor revisa este código: ${code}`);
console.log(review);

// Example 3: Error handling
const result = await getChatGPTResponse('Explica las promesas en JavaScript');
if (result) {
  console.log('Respuesta:', result);
} else {
  console.log('Error al obtener respuesta');
}
```

### Configuration

Make sure to set the `OPENAI_API_KEY` environment variable:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

Or add it to your `.env` file:

```
OPENAI_API_KEY=your-api-key-here
```

### Features
- Uses GPT-4 model for high-quality responses
- System message configured for programming assistance in Spanish
- Automatic error handling and logging
- Returns `null` on errors for safe handling

### Error Handling
The function catches all errors and logs them to the console. If an error occurs:
- The error is logged with details
- The function returns `null`
- Your application can continue running

### Integration with Server

You can use this function in your Express routes:

```javascript
import getChatGPTResponse from './api/chatgpt.js';
import express from 'express';

const app = express();

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;
  const answer = await getChatGPTResponse(question);
  
  if (answer) {
    res.json({ answer });
  } else {
    res.status(500).json({ error: 'Failed to get response from ChatGPT' });
  }
});
```

### API Rate Limits
Be aware of OpenAI's rate limits and pricing. The function uses GPT-4 which has different pricing than GPT-3.5.

### Testing
Tests are available in `tests/chatgpt.test.js`. Run them with:

```bash
npm test
```
