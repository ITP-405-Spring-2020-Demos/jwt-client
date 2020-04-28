import Route from '@ember/routing/route';
import { fetch } from 'fetch';
import config from 'jwt-client-ember/config/environment';

const { API_ENDPOINT } = config.APP;

export default class PlaylistsRoute extends Route {
  async model() {
    let response = await fetch(`${API_ENDPOINT}/api/playlists`);
    return response.json();
  }
}
