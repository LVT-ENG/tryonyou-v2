export class ReturnCenter {
  constructor() {
    this.returns = []; // { user, orderId, reason, status }
  }

  requestReturn(user, orderId, reason) {
    this.returns.push({ user, orderId, reason, status: 'pending' });
  }

  approveReturn(orderId) {
    const r = this.returns.find(ret => ret.orderId === orderId);
    if (r) r.status = 'approved';
  }

  listReturns(user) {
    return this.returns.filter(r => r.user === user);
  }
}
