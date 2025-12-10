export class RewardCenter {
  constructor() {
    this.rewards = new Map(); // user -> [{ reward, status }]
  }

  assignReward(user, reward) {
    if (!this.rewards.has(user)) this.rewards.set(user, []);
    this.rewards.get(user).push({ reward, status: 'pending' });
  }

  markRedeemed(user, reward) {
    const list = this.rewards.get(user) || [];
    const target = list.find(r => r.reward === reward);
    if (target) target.status = 'redeemed';
  }

  getRewards(user) {
    return this.rewards.get(user) || [];
  }
}
