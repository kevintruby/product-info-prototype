import Vue from 'vue'
import Vuex from 'vuex'

// modules
import products from '@/store/modules/products';
import session from '@/store/modules/session';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    session,
  },
  state: {},
  mutations: {},
  actions: {},
});
