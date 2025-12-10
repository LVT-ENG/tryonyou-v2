export class GlobalSync {
  constructor(apiBase) {
    this.api = apiBase;
  }

  async pushData(type, data) {
    return fetch(`${this.api}/sync/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  async pullData(type) {
    const res = await fetch(`${this.api}/sync/${type}`);
    return res.json();
  }
}
