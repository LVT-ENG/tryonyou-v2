import { readdirSync } from 'fs';
import { exec } from 'child_process';

const dir = '03_Agentes_Inteligentes';
const agents = readdirSync(dir).filter(f => f.endsWith('.js'));

function runAgent(i) {
  if (i >= agents.length) return;
  const file = agents[i];
  exec(`node ${dir}/${file}`, (err, stdout, stderr) => {
    if (stderr) console.error(`[${file} STDERR]\n${stderr}`);
    if (stdout) console.log(`[${file} STDOUT]\n${stdout}`);
    if (err) console.error(`[ERROR] ${file} exited with code ${err.code}`);
    runAgent(i + 1);
  });
}

runAgent(0);
