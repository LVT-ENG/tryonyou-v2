export const plotterBot = (message) => {
  const fs = require('fs');
  const logPath = './plotter_logs.txt';
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}\n`);
  console.log('📊 Plotter actualizado:', message);
};
