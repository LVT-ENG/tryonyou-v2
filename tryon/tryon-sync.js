import { postJson } from './tryon-http.js';

export class GlobalSync {
  constructor(apiBase) {
    this.api = apiBase;
  }

  async pushData(type, data) {
    return postJson(`${this.api}/sync/${type}`, data);
  }

  async pullData(type) {
    const res = await fetch(`${this.api}/sync/${type}`);
    return res.json();
  }
}
