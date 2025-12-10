import { chromium } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://tryonyou.myshopify.com/admin');
  await page.fill('#account_email', process.env.SHOPIFY_EMAIL || '');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1200);
  await page.fill('input[type="password"]', process.env.SHOPIFY_PASSWORD || '');
  await page.click('button[type="submit"]');

  await page.goto('https://tryonyou.myshopify.com/admin/settings/domains');
  await page.waitForTimeout(2000);
  await page.click('text=Connect existing domain');
  await page.waitForTimeout(1000);

  await page.fill('input[type="text"]', 'tryonyou.app');
  await page.click('button:has-text("Next")');

  console.log('🌍 Dominio tryonyou.app enviado para conexión...');

  await page.waitForSelector('text=Update your DNS settings', { timeout: 15000 });

  console.log(`\n📡 DNS RECORDS A CONFIGURAR:\n\n- A Record:\n  Host: @\n  Points to: 23.227.38.65\n\n- CNAME Record:\n  Host: www\n  Points to: shops.myshopify.com\n\n⌛ Esperar hasta que Shopify verifique el dominio y genere el certificado SSL.\n✅ Luego ve a Settings > Domains y marca tryonyou.app como Primary Domain.\n`);

  await browser.close();
})();
