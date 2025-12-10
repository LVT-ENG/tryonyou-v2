const fs = require('fs');
const path = require('path');
const { updateRejection, resetTracker } = require('../autodonate_tracker.cjs');

const DATA_FILE = path.join(process.cwd(), 'data', 'donation_status.json');

describe('autodonate tracker', () => {
  beforeEach(() => {
    if (fs.existsSync(DATA_FILE)) fs.unlinkSync(DATA_FILE);
    resetTracker();
  });

  test('triggers after three rejections', () => {
    expect(updateRejection('u1', 'item1', 70)).toBe(false);
    expect(updateRejection('u1', 'item1', 70)).toBe(false);
    expect(updateRejection('u1', 'item1', 70)).toBe(true);
  });

  test('triggers on low mood', () => {
    expect(updateRejection('u2', 'item2', 20)).toBe(true);
  });
});
