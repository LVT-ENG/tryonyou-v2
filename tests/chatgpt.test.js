/**
 * Tests for getChatGPTResponse function
 * Basic validation tests for the ChatGPT API integration
 */

import { jest } from '@jest/globals';

describe('getChatGPTResponse', () => {
  let getChatGPTResponse;

  beforeAll(async () => {
    // Dynamically import the ES module
    const module = await import('../api/chatgpt.js');
    getChatGPTResponse = module.getChatGPTResponse || module.default;
  });

  test('should be a function', () => {
    expect(typeof getChatGPTResponse).toBe('function');
  });

  test('should return null when OPENAI_API_KEY is not set', async () => {
    const originalKey = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const result = await getChatGPTResponse('Test prompt');

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
    process.env.OPENAI_API_KEY = originalKey;
  });

  test('should handle empty prompt', async () => {
    const result = await getChatGPTResponse('');
    // Should either return null or a response, but shouldn't crash
    expect(result === null || typeof result === 'string').toBe(true);
  });
});
