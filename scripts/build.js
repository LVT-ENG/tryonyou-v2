import { cpSync, mkdirSync, rmSync } from 'fs';

const out = 'build';
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// copy main files
cpSync('index.html', `${out}/index.html`);
cpSync('manifest.json', `${out}/manifest.json`);
cpSync('script.js', `${out}/script.js`);
cpSync('style.css', `${out}/style.css`);

// copy folders
cpSync('css', `${out}/css`, { recursive: true });
cpSync('products', `${out}/products`, { recursive: true });
