import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import https from 'https';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let HttpsProxyAgent;
try {
  ({ HttpsProxyAgent } = require('https-proxy-agent'));
} catch {
  // Optional dependency: only used when proxy settings are defined
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const dest = resolve(__dirname, '..', 'dataset.json');
const url = 'https://raw.githubusercontent.com/typicode/demo/master/db.json';
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const agent = proxy && HttpsProxyAgent ? new HttpsProxyAgent(proxy) : undefined;

const fallbackData = JSON.stringify(
  {
    posts: [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
      { id: 3, title: 'Post 3' }
    ]
  },
  null,
  2
);

export function fetchDataset() {
  return new Promise(resolve => {
    function writeFallback() {
      writeFile(dest, fallbackData).then(() => {
        console.warn('Network unavailable, wrote fallback dataset');
        resolve();
      });
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
