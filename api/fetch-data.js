import { HttpsProxyAgent } from 'https-proxy-agent';

const DATA_URL = 'https://raw.githubusercontent.com/typicode/demo/master/db.json';

export default async function handler(req, res) {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;

  try {
    const response = await fetch(DATA_URL, { agent });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
}
