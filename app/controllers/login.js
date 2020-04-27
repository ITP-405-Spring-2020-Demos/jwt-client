import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { fetch } from 'fetch';
import config from 'jwt-client-ember/config/environment';

const { API_ENDPOINT } = config.APP;

export default class LoginController extends Controller {
  @tracked username = 'dtang';
  @tracked password = 'password';
  @tracked error;

  @action
  async login(event) {
    event.preventDefault();

    this.error = null;

    const response = await fetch(`${API_ENDPOINT}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    });

    if (response.ok) {
      const json = await response.json();
      sessionStorage.token = json.token;
      this.transitionToRoute('playlists');
    } else {
      this.error = 'Invalid Credentials';
    }
  }
}
