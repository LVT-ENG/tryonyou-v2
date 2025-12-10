export class Payments {
  constructor(apiKey) {
    this.key = apiKey;
  }

  async checkout(cartItems) {
    const session = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems })
    });
    return session.json();
  }
}
