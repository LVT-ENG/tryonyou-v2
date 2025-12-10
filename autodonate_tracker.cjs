const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data', 'donation_status.json');
let data = {};
try {
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
} catch {
  data = {};
}

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function updateRejection(userId, itemId, moodScore = 100) {
  const key = `${userId}:${itemId}`;
  if (!data[key]) data[key] = { count: 0, moodScore };
  data[key].count += 1;
  data[key].moodScore = moodScore;
  save();
  return data[key].count >= 3 || moodScore < 40;
}

function resetTracker() {
  data = {};
  save();
}

module.exports = { updateRejection, resetTracker };
