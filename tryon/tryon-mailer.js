export class EmailNotifier {
  constructor(serviceUrl) {
    this.url = serviceUrl;
  }

  async send(to, subject, body) {
    return fetch(`${this.url}/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body })
    });
  }
}
