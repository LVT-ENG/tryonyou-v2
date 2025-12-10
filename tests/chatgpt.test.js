const { getChatGPTResponse } = require('../utils/chatgpt');
const axios = require('axios');

// Mock axios
jest.mock('axios');

describe('getChatGPTResponse', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns response content on successful API call', async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: 'This is a test response from ChatGPT',
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    const result = await getChatGPTResponse('Test prompt', {
      apiKey: 'test-api-key',
    });

    expect(result).toBe('This is a test response from ChatGPT');
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Test prompt' }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-api-key',
        },
      }
    );
  });

  test('uses custom model when specified', async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: 'Response from custom model',
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    await getChatGPTResponse('Test prompt', {
      model: 'gpt-3.5-turbo',
      apiKey: 'test-api-key',
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        model: 'gpt-3.5-turbo',
      }),
      expect.any(Object)
    );
  });

  test('returns null when API key is missing', async () => {
    const originalEnv = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    const result = await getChatGPTResponse('Test prompt');

    expect(result).toBeNull();
    expect(axios.post).not.toHaveBeenCalled();

    process.env.OPENAI_API_KEY = originalEnv;
  });

  test('returns null and logs error on API failure', async () => {
    const mockError = new Error('API request failed');
    mockError.response = {
      status: 500,
      data: { error: 'Internal server error' },
    };

    axios.post.mockRejectedValue(mockError);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getChatGPTResponse('Test prompt', {
      apiKey: 'test-api-key',
    });

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('handles network errors gracefully', async () => {
    const networkError = new Error('Network error');
    axios.post.mockRejectedValue(networkError);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getChatGPTResponse('Test prompt', {
      apiKey: 'test-api-key',
    });

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('returns null when API response structure is unexpected', async () => {
    const mockResponse = {
      data: {
        choices: [], // Empty choices array
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getChatGPTResponse('Test prompt', {
      apiKey: 'test-api-key',
    });

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error: Unexpected API response structure');

    consoleSpy.mockRestore();
  });
});
