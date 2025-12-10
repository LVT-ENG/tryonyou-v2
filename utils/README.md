# ChatGPT Utility

A reusable utility module for making API calls to OpenAI's ChatGPT.

## Installation

The module requires the following dependencies (already included in package.json):
- axios
- dotenv

## Configuration

Set your OpenAI API key in the `.env` file:

```
OPENAI_API_KEY=your_api_key_here
```

## Usage

### Basic Usage

```javascript
const { getChatGPTResponse } = require('./utils/chatgpt');

async function example() {
  const response = await getChatGPTResponse('What is the capital of France?');
  console.log(response); // "The capital of France is Paris."
}

example();
```

### Custom Model

```javascript
const { getChatGPTResponse } = require('./utils/chatgpt');

async function example() {
  const response = await getChatGPTResponse(
    'Translate "hello" to Spanish',
    { model: 'gpt-3.5-turbo' }
  );
  console.log(response); // "Hola"
}

example();
```

### Override API Key

```javascript
const { getChatGPTResponse } = require('./utils/chatgpt');

async function example() {
  const response = await getChatGPTResponse(
    'What is 2+2?',
    { apiKey: 'your-custom-api-key' }
  );
  console.log(response); // "4"
}

example();
```

## API Reference

### `getChatGPTResponse(prompt, options)`

Sends a prompt to ChatGPT and retrieves the response.

**Parameters:**
- `prompt` (string): The user prompt to send to ChatGPT.
- `options` (object, optional):
  - `model` (string): The model to use (default: 'gpt-4').
  - `apiKey` (string): Override the API key from environment.

**Returns:**
- `Promise<string|null>`: The response content or null on error.

## Error Handling

The function returns `null` if:
- The API key is not configured
- The API request fails
- A network error occurs

Errors are logged to the console with details.

## Testing

Run the test suite:

```bash
npm test
```

The utility includes comprehensive tests covering:
- Successful API calls
- Custom model usage
- Missing API key handling
- API failure scenarios
- Network error handling
