import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @tracked username = 'dtang';
  @tracked password = 'password';
  @tracked error;

  @service session;

  @action
  async login(event) {
    event.preventDefault();

    this.error = null;

    try {
      await this.session.authenticate(this.username, this.password);
      this.transitionToRoute('playlists');
    } catch(error) {
      this.error = 'Invalid Credentials';
    }
  }
}
