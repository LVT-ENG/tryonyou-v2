import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { updateRejection } = require('./autodonate_tracker.cjs');

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize OpenAI only if the API key is present
const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.warn('OPENAI_API_KEY not set. Some routes will fail.');
}
const openai = OPENAI_KEY ? new OpenAI({ apiKey: OPENAI_KEY }) : null;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// ============ SUPERAGENTE CORE ==========
app.post('/tryonme-core', async (req, res) => {
  const { measurements, preferences, mood } = req.body || {};
  if (!openai) {
    return res.status(503).json({ error: 'OPENAI_API_KEY not configured' });
  }
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
  const id = measurements && measurements.id ? measurements.id : Date.now();
  return {
    bodyShape: 'Ectomorph',
    keyMetrics: measurements,
    url: `https://cdn.tryonyou.app/avatar/${id}.glb`,
  };
}

// ============ RECOMMENDATION (LOOK CURATOR) ==========
async function generateRecommendation(measurements, preferences) {
  if (!openai) {
    throw new Error('OPENAI_API_KEY not configured');
  }
  const prompt = `Recommend 3 items from the catalogue that fit someone with these measurements: ${JSON.stringify(
    measurements
  )} and preferences: ${preferences}`;
  const response = await openai.responses.create({
    model: 'gpt-4o',
    input: prompt,
  });
  return response.output_text;
}

// ============ EMOTIONAL COMPANION (PAU LE PAON) ==========
async function emotionalCompanion(mood) {
  if (!openai) {
    throw new Error('OPENAI_API_KEY not configured');
  }
  const prompt = `As Pau le Paon, an emotional assistant, respond to a user who feels ${mood}`;
  const response = await openai.responses.create({
    model: 'gpt-4o',
    input: prompt,
  });
  return response.output_text;
}

// ============ SHOPIFY UPLOAD TRIGGER ==========
app.post('/shopify/upload', async (req, res) => {
  const { csvData } = req.body || {};
  if (typeof csvData !== 'string') {
    return res.status(400).json({ error: 'Invalid CSV payload' });
  }
  try {
    const sanitized = csvData.replace(/[^\w\s,;\n\r\-_.]/g, '');
    const filePath = path.join(process.cwd(), 'shopify_upload.csv');
    fs.writeFileSync(filePath, sanitized);
    res.json({ status: 'ready_for_upload', file: filePath });
  } catch (error) {
    console.error('Error in /shopify/upload:', error);
    res.status(500).json({ error: 'Unable to generate CSV' });
  }
});

// ============ AUTO-DONATE FILTER ==========
app.post('/donate-check', async (req, res) => {
  const { images } = req.body || {};
  if (!openai) {
    return res.status(503).json({ error: 'OPENAI_API_KEY not configured' });
  }
  try {
    const analysis = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Detect if the clothing in this image is damaged or reusable.' },
            ...(Array.isArray(images) ? images.map((img) => ({ type: 'image_url', image_url: img })) : []),
          ],
        },
      ],
    });
    res.json({ analysis: analysis.output_text });
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

// ============ STATIC FILE SERVING ==========
app.use(express.static('public'));

// ============ START SERVER ==========
app.listen(PORT, () => {
  console.log(`TRYONME server running on port ${PORT}`);
});

export default app;
