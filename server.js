import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import autodonate from './autodonate_tracker.js';
const { updateRejection } = autodonate;

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize OpenAI only if the API key is present
if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY not set. Some routes will fail.');
}
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

// ============ SUPERAGENTE CORE ==========
app.post('/tryonme-core', async (req, res) => {
  const { measurements, preferences, mood } = req.body;
  try {
    const avatar = await generateAvatar(measurements);
    const recommendation = await generateRecommendation(measurements, preferences);
    const emotion = await emotionalCompanion(mood);
    res.json({ avatar, recommendation, emotion });
  } catch (error) {
    console.error('Error in /tryonme-core:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============ GENERATE AVATAR (FIT-AI) ==========
async function generateAvatar(measurements) {
  return {
    bodyShape: 'Ectomorph',
    keyMetrics: measurements,
    url: 'https://cdn.tryonme.com/avatar/' + measurements.id + '.glb',
  };
}

// ============ RECOMMENDATION (LOOK CURATOR) ==========
async function generateRecommendation(measurements, preferences) {
  const prompt = `Recommend 3 items from the catalogue that fit someone with these measurements: ${JSON.stringify(
    measurements
  )} and preferences: ${preferences}`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });
  return completion.choices[0].message.content;
}

// ============ EMOTIONAL COMPANION (PAU LE PAON) ==========
async function emotionalCompanion(mood) {
  const prompt = `As Pau le Paon, an emotional assistant, respond to a user who feels ${mood}`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });
  return completion.choices[0].message.content;
}

// ============ SHOPIFY UPLOAD TRIGGER ==========
app.post('/shopify/upload', async (req, res) => {
  const { csvData } = req.body;
  try {
    fs.writeFileSync('./shopify_upload.csv', csvData);
    res.json({ status: 'ready_for_upload', file: './shopify_upload.csv' });
  } catch (error) {
    console.error('Error in /shopify/upload:', error);
    res.status(500).json({ error: 'Unable to generate CSV' });
  }
});

// ============ AUTO-DONATE FILTER ==========
app.post('/donate-check', async (req, res) => {
  const { images } = req.body;
  try {
    const analysis = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Detect if the clothing in this image is damaged or reusable.' },
            ...images.map((img) => ({ type: 'image_url', image_url: img })),
          ],
        },
      ],
    });
    res.json({ analysis: analysis.choices[0].message.content });
  } catch (error) {
    console.error('Error in /donate-check:', error);
    res.status(500).json({ error: 'Unable to analyze images' });
  }
});

// ============ AUTODONATE TRACKER ==========
app.post('/autodonate/check', (req, res) => {
  const { userId, itemId, moodScore } = req.body || {};
  if (!userId || !itemId) {
    return res.status(400).json({ error: 'userId and itemId required' });
  }
  const donate = updateRejection(userId, itemId, moodScore ?? 100);
  res.json({ donate });
});

// ============ START SERVER ==========
app.listen(PORT, () => {
  console.log(`TRYONME server running on port ${PORT}`);
});
