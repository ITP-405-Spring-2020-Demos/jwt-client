import Route from '@ember/routing/route';
import { fetch } from 'fetch';
import config from 'jwt-client-ember/config/environment';
import { inject as service } from '@ember/service';

const { API_ENDPOINT } = config.APP;

export default class PlaylistsRoute extends Route {
  @service session;

  async model() {
    let response = await fetch(`${API_ENDPOINT}/api/playlists`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });

    if (response.status === 401) {
      this.session.invalidate();
      this.transitionTo('login')
    } else {
      return response.json();
    }
  }
}
