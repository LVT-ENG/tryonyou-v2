import dotenv from 'dotenv';
import { chromium } from 'playwright';

// Load environment variables from .env
dotenv.config();

const ADMIN_EMAIL = process.env.SHOPIFY_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SHOPIFY_ADMIN_PASSWORD;
const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || 'tryonyou.myshopify.com';
const PUBLIC_URL = process.env.SHOPIFY_PUBLIC_URL || 'https://tryonyou.app';

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing SHOPIFY_ADMIN_EMAIL or SHOPIFY_ADMIN_PASSWORD');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Login
  await page.goto(`https://${STORE_DOMAIN}/admin`);
  await page.fill('#account_email', ADMIN_EMAIL);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  await page.fill('input[type="password"]', ADMIN_PASSWORD);
  await page.click('button[type="submit"]');

  // 2. Navigate to Online Store > Preferences
  await page.goto(`https://${STORE_DOMAIN}/admin/preferences`);

  // 3. Disable password if enabled
  const checkbox = await page.$('#password_protection_enabled');
  const checked = checkbox && (await checkbox.isChecked());
  if (checked) {
    await checkbox.click();
    console.log('🔧 Password disabled');
  } else {
    console.log('✅ Already disabled');
  }

  // 4. Save
  await page.click('button:has-text("Save")');
  await page.waitForTimeout(2000);

  // 5. Verify storefront is public
  await page.goto(PUBLIC_URL);
  const body = await page.textContent('body');
  if (!body.includes('Enter using password')) {
    console.log(`✅ ${PUBLIC_URL} accessible without password`);
  } else {
    console.log('❌ Storefront still requires password');
  }

  await browser.close();
})();
