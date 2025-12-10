import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import https from 'https';
async function loadProxyAgent(proxy) {
  if (!proxy) return undefined;
  try {
    const { HttpsProxyAgent } = await import('https-proxy-agent');
    return new HttpsProxyAgent(proxy);
  } catch {
    console.warn('https-proxy-agent not installed; continuing without proxy');
    return undefined;
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const dest = resolve(__dirname, '..', 'dataset.json');
const url =
  process.env.DATASET_URL ||
  'https://raw.githubusercontent.com/typicode/demo/master/db.json';
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;

const fallbackDataset = {
  posts: [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' }
  ]
};

export async function fetchDataset() {
  const agent = await loadProxyAgent(proxy);
  return new Promise(resolve => {
    async function writeFallback() {
      await writeFile(dest, JSON.stringify(fallbackDataset, null, 2));
      console.warn('Network unavailable, wrote fallback dataset');
      resolve();
    }

    https
      .get(url, { agent, family: 4 }, res => {
        if (res.statusCode !== 200) {
          res.resume();
          writeFallback();
          return;
        }
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', async () => {
          await writeFile(dest, data);
          console.log('Dataset saved to', dest);
          resolve();
        });
      })
      .on('error', writeFallback);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchDataset().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
