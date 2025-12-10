import { postJson } from './tryon-http.js';

export class EmailNotifier {
  constructor(serviceUrl) {
    this.url = serviceUrl;
  }

  async send(to, subject, body) {
    return postJson(`${this.url}/email`, { to, subject, body });
  }
}
