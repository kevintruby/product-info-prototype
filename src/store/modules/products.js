// model classes
import { Product } from '@/models/Product';
import { ProductFromCollectionApi } from '@/models/factories/ProductFactory';

// axios for API calls
import axios from 'axios';
axios.defaults.baseURL = 'https://api.commercetools.co/nuts-custom-demo-1';

const state = {
  fetching_products: false,
  products: [],
  product_request_limit: 10,
  product_result_limit: 20, // initialize to double request limit, will be updated
  selected_product_id: null,
};

const getters = {};

const actions = {
  getProducts ({ commit, state }) {
    // prevent concurrent calls if already fetching data
    if (state.fetching_products)
      return;

    commit('setFetchingProductsState', true);

    // fetch products
    const url = `/products?offset=${state.products.length}&limit=${state.product_request_limit}`;
    axios.get(url)
      .then(({ data } = {}) => {
        // @todo: parse API results
      })
      .catch(err => console.error(err))
      .then(() => commit('setFetchingProductsState', false));
  },
};

const mutations = {
  setFetchingProductsState (state, is_fetching_products) {
    // sanity check on data type
    if (is_fetching_products === undefined || is_fetching_products === null || !is_fetching_products.constructor === Boolean)
      return;

    state.fetching_products = is_fetching_products;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
