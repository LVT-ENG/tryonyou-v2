import https from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';

const DATA_URL = 'https://raw.githubusercontent.com/typicode/demo/master/db.json';

export default async function handler(req, res) {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;

  try {
    const data = await new Promise((resolve, reject) => {
      https
        .get(DATA_URL, { agent }, response => {
          if (response.statusCode !== 200) {
            reject(new Error(`Failed to fetch: ${response.statusCode}`));
            response.resume();
            return;
          }
          let body = '';
          response.on('data', chunk => {
            body += chunk;
          });
          response.on('end', () => resolve(body));
        })
        .on('error', reject);
    });

    res.status(200).json(JSON.parse(data));
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
}
