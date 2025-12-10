import { postJson } from './tryon-http.js';

export class Payments {
  constructor(apiKey) {
    this.key = apiKey;
  }

  async checkout(cartItems) {
    return postJson('/api/checkout', { items: cartItems });
  }
}
