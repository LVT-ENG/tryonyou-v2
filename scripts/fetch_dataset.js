import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import https from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dest = resolve(__dirname, '..', 'dataset.json');
const url = 'https://raw.githubusercontent.com/typicode/demo/master/db.json';
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;

export function fetchDataset() {
  return new Promise((resolve, reject) => {
    https
      .get(url, { agent }, res => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch dataset: ${res.statusCode}`));
          res.resume();
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
      .on('error', reject);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchDataset().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
