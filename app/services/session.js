import Service from '@ember/service';
import { fetch } from 'fetch';
import config from 'jwt-client-ember/config/environment';
import { tracked } from '@glimmer/tracking';

const { API_ENDPOINT } = config.APP;

export default class SessionService extends Service {
  @tracked currentUser;

  constructor() {
    super(...arguments);
    if (sessionStorage.token) {
      this.initializeCurrentUser();
    }
  }

  initializeCurrentUser() {
    let [header, payload, signature] = sessionStorage.token.split('.');
    let decodedPayload = window.atob(payload);
    this.currentUser = JSON.parse(decodedPayload);
  }

  invalidate() {
    this.currentUser = null;
    sessionStorage.removeItem('token');
  }

  async authenticate(username, password) {
    const response = await fetch(`${API_ENDPOINT}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.ok) {
      const json = await response.json();
      sessionStorage.token = json.token;
      this.initializeCurrentUser();
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
