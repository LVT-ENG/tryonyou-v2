export class Favorites {
  constructor() {
    this.set = new Set();
  }

  toggle(itemId) {
    if (this.set.has(itemId)) this.set.delete(itemId);
    else this.set.add(itemId);
  }

  list() {
    return Array.from(this.set);
  }
}
