import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    console.log('[FETCH-DATA] Requesting price from CoinDesk...');
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await response.json();
    console.log('[FETCH-DATA] Data received:', data);

    const result = await fetch('https://tryonyou.vercel.app/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const processed = await result.json();
    console.log('[FETCH-DATA] Processed result:', processed);

    res.status(200).json({ usd: processed.usd });
  } catch (error) {
    console.error('[FETCH-DATA] Error:', error);
    res.status(500).json({ error: 'Processing failed', message: error.message });
  }
}
