import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_VERSION = '2023-07';

export async function uploadToShopify(product) {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE}/admin/api/${API_VERSION}/products.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  console.log(
    data.product
      ? `🛒 Producto subido: ${data.product.title}`
      : `❌ Error: ${JSON.stringify(data.errors)}`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      const fileArg = process.argv[2] || 'products/tryon-products.json';
      const filePath = resolve(dirname(fileURLToPath(import.meta.url)), '..', fileArg);
      const content = await readFile(filePath, 'utf-8');
      const items = JSON.parse(content);
      const products = Array.isArray(items) ? items : [items];
      for (const product of products) {
        await uploadToShopify(product);
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
