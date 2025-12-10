/**
 * Example integration of getChatGPTResponse into Express server
 * This shows how to add a new endpoint that uses the getChatGPTResponse function
 */

import express from 'express';
import getChatGPTResponse from '../api/chatgpt.js';

const app = express();
app.use(express.json());

// Example endpoint that uses getChatGPTResponse
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await getChatGPTResponse(prompt);
    
    if (response) {
      res.json({ 
        success: true,
        response: response 
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: 'Failed to get response from ChatGPT' 
      });
    }
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
});

// Example: Code review endpoint
app.post('/api/code-review', async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const prompt = `Por favor revisa el siguiente código y sugiere mejoras:\n\n${code}`;
    const review = await getChatGPTResponse(prompt);
    
    if (review) {
      res.json({ review });
    } else {
      res.status(500).json({ error: 'Failed to review code' });
    }
  } catch (error) {
    console.error('Error in /api/code-review:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
});

// Example: Programming question endpoint
app.post('/api/ask-programming', async (req, res) => {
  const { question } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const answer = await getChatGPTResponse(question);
    
    if (answer) {
      res.json({ answer });
    } else {
      res.status(500).json({ error: 'Failed to get answer' });
    }
  } catch (error) {
    console.error('Error in /api/ask-programming:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
