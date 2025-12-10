export class OrderTracker {
  constructor() {
    this.orders = new Map(); // orderId -> { status, steps }
  }

  create(orderId) {
    this.orders.set(orderId, { status: 'processing', steps: ['received'] });
  }

  update(orderId, status, step) {
    if (this.orders.has(orderId)) {
      const order = this.orders.get(orderId);
      order.status = status;
      if (!order.steps.includes(step)) order.steps.push(step);
    }
  }

  get(orderId) {
    return this.orders.get(orderId);
  }
}
