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
        // sanity check on data type
        if (!data || data.constructor !== Object)
          return;

        // parse API results
        let { results = [], total = 0 } = data,
            parsed_products = [];

        // prepare Product instances from results
        if (results && results.constructor === Array) {
          results.forEach(result_obj => {
            let product_obj = ProductFromCollectionApi(result_obj);

            // sanity check to make sure we got a Product instance back
            if (product_obj && product_obj.constructor === Product)
              parsed_products.push(product_obj)
          });
        }

        // update collection state
        if (parsed_products.length)
          commit('addProducts', parsed_products);

        // @todo: check to see if we've reached the end, so that infinite scroll doesn't keep querying
      })
      .catch(err => console.error(err))
      .then(() => commit('setFetchingProductsState', false));
  },
};

const mutations = {
  addProducts (state, products_collection) {
    // sanity check on data type
    if (!products_collection || products_collection.constructor !== Array)
      return;

    // strip out any possible ID duplicates
    let unique_products = products_collection.filter(product_obj => (state.products.findIndex(existing_obj => existing_obj.id === product_obj.id) === -1));

    // if we have remaining products after pulling out duplicates, update state collection; should be an empty array if none are left
    unique_products.forEach(product_obj => state.products.push(product_obj));
  },
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
