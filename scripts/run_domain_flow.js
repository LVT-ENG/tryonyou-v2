import dotenv from 'dotenv';

dotenv.config();

const API_BASE = process.env.DOMAIN_API_BASE || 'https://tryonyou.vercel.app/api';
const DOMAIN = process.env.DOMAIN;
const A_RECORD = process.env.A_RECORD;
const CNAME_TARGET = process.env.CNAME_TARGET;

if (!DOMAIN) {
  console.error('DOMAIN environment variable is required');
  process.exit(1);
}

async function post(endpoint, data) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${endpoint} failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function run() {
  try {
    console.log('1/4 Connect domain');
    await post('connect_domain', { domain: DOMAIN });

    console.log('2/4 Update DNS');
    await post('update_dns', { domain: DOMAIN, A: A_RECORD, CNAME: CNAME_TARGET });

    console.log('3/4 Set primary domain');
    await post('set_primary_domain', { domain: DOMAIN });

    console.log('4/4 Verify DNS');
    await post('verify_dns', { domain: DOMAIN });

    console.log('✅ Domain automation flow completed');
  } catch (err) {
    console.error('❌ Flow failed:', err.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
