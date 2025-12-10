import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import autodonate from './autodonate_tracker.js';
const { updateRejection } = autodonate;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// ======= SUPERAGENTE CORE =======
app.post('/tryonme-core', async (req, res) => {
  const { measurements, preferences, mood } = req.body || {};
  try {
    const avatar = await generateAvatar(measurements);
    const recommendation = await generateRecommendation(measurements, preferences);
    const emotion = await emotionalCompanion(mood);
    res.json({ avatar, recommendation, emotion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======= GENERATE AVATAR (FIT-AI) =======
async function generateAvatar(measurements) {
  const id = measurements && measurements.id ? measurements.id : Date.now();
  return {
    bodyShape: 'Ectomorph',
    keyMetrics: measurements,
    url: `https://cdn.tryonyou.app/avatar/${id}.glb`,
  };
}

// ======= RECOMMENDATION (LOOK CURATOR) =======
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

// ======= EMOTIONAL COMPANION (PAU LE PAON) =======
async function emotionalCompanion(mood) {
  const prompt = `As Pau le Paon, an emotional assistant, respond to a user who feels ${mood}`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });
  return completion.choices[0].message.content;
}

// ======= SECURE SHOPIFY UPLOAD TRIGGER =======
app.post('/shopify/upload', async (req, res) => {
  const { csvData } = req.body || {};
  if (typeof csvData !== 'string') {
    return res.status(400).json({ error: 'Invalid CSV payload' });
  }
  const sanitized = csvData.replace(/[^\w\s,;\n\r\-_.]/g, '');
  const filePath = path.join(process.cwd(), 'shopify_upload.csv');
  fs.writeFileSync(filePath, sanitized);
  res.json({ status: 'ready_for_upload', file: filePath });
});

// ======= AUTO-DONATE FILTER =======
app.post('/donate-check', async (req, res) => {
  const { images } = req.body || {};
  try {
    const analysis = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Detect if the clothing in this image is damaged or reusable.' },
            ...(Array.isArray(images) ? images.map((img) => ({ type: 'image_url', image_url: img })) : []),
          ],
        },
      ],
    });
    res.json({ analysis: analysis.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======= AUTODONATE TRACKER =======
app.post('/autodonate/check', (req, res) => {
  const { userId, itemId, moodScore } = req.body || {};
  if (!userId || !itemId) {
    return res.status(400).json({ error: 'userId and itemId required' });
  }
  const donate = updateRejection(userId, itemId, moodScore ?? 100);
  res.json({ donate });
});

// ======= DEPLOYED VITE BUILD =======
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// ======= START SERVER =======
app.listen(PORT, () => {
  console.log(`TRYONME server running on port ${PORT}`);
});

export default app;
