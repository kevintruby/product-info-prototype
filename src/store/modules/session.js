// model classes -- may not be needed for prototype; would add definitions for User model here if applicable

// axios for API calls
import axios from 'axios';

const state = {
  api_bearer_token: '',
};

const getters = {};

const actions = {
  setAxiosAuthHeader ({ state }) {
    // webpack shares an axios instance between the modules; prepare bearer token here, for use in products module
    axios.defaults.headers.common['Authorization'] = `Bearer ${state.api_bearer_token}`;
  },
  updateBearerToken ({ commit, dispatch }) {
    // Vuex action to asynchronously config the app for fetching products
    // defines necessary params here; ideally auth username/password would come from .env file, will set up if time permits
    const params = `grant_type=client_credentials&scope=view_products:nuts-custom-demo-1`,
          oauth_url = 'https://auth.commercetools.co/oauth/token',
          refresh_axios_instance = axios.create({
            auth: {
              username: 'BZaa-av5L6RmZKlPgZaGNkea',
              password: 'jchbf_Q5zRWCaEg4TCB4m9cLIioPiml0'
            },
          });

    // make API call to get the necessary auth bearer token
    refresh_axios_instance.post(oauth_url, params)
      .then(({ data } = {}) => {
        // sanity check on data type
        if (!data || data.constructor !== Object)
          return;

        // destructure API results if we were successful -- mutations and actions invoked will handle sanity checks
        let { access_token = '', expires_in } = data;
        if (access_token && access_token.constructor === String && access_token.length) {
          commit('setBearerToken', access_token);
          dispatch('setAxiosAuthHeader');

          // automatic refresh if expires while app is running; expires_in value is seconds
          if (expires_in && expires_in.constructor === Number)
            setTimeout(() => dispatch('updateBearerToken'), expires_in * 1000);
        }
      })
      .catch(err => console.error(err));
  },
};

const mutations = {
  setBearerToken (state, token) {
    // sanity check on data type
    if (!token || token.constructor !== String || !token.length)
      return;

    state.api_bearer_token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
