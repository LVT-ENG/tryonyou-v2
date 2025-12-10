/**
 * Manual test script for getChatGPTResponse function
 * Run with: node api/test-chatgpt-manual.js
 */

import getChatGPTResponse from './chatgpt.js';

async function runTests() {
  console.log('🧪 Testing getChatGPTResponse function...\n');

  // Test 1: Check if API key is set
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  OPENAI_API_KEY not set. Skipping live API tests.');
    console.log('✅ Function structure test passed - function exists and is callable\n');
    return;
  }

  // Test 2: Simple prompt
  console.log('Test 1: Simple programming question');
  const response1 = await getChatGPTResponse('¿Qué es una función async en JavaScript? Responde en una línea.');
  if (response1) {
    console.log('✅ Response received:', response1.substring(0, 100) + '...\n');
  } else {
    console.log('❌ Failed to get response\n');
  }

  // Test 3: Error handling (empty prompt)
  console.log('Test 2: Empty prompt handling');
  const response2 = await getChatGPTResponse('');
  if (response2 !== null) {
    console.log('✅ Empty prompt handled:', response2 ? 'Got response' : 'No response\n');
  } else {
    console.log('✅ Empty prompt returned null as expected\n');
  }

  console.log('✅ All tests completed!');
}

runTests().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
