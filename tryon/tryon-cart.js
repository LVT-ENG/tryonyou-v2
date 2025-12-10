export class Cart {
  constructor() {
    this.items = [];
  }

  add(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) existing.quantity += 1;
    else this.items.push({ ...item, quantity: 1 });
  }

  remove(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
  }

  total() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  clear() {
    this.items = [];
  }
}
