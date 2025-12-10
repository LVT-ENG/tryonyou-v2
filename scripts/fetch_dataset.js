import { writeFile, access } from 'fs/promises';
import { constants as fsConstants } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import https from 'https';
import env from '../env.js';
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
const url = env.DATASET_URL ||
  'https://raw.githubusercontent.com/typicode/demo/master/db.json';
const proxy = env.HTTPS_PROXY;

const fallbackDataset = {
  posts: [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' }
  ]
};

export async function fetchDataset() {
  if (!env.FORCE_FETCH) {
    try {
      await access(dest, fsConstants.F_OK);
      console.log('Dataset already exists at', dest);
      return;
    } catch {
      /* not present, continue */
    }
  }

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
