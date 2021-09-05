import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Category from './modules/Category';
import Product from './modules/ProductList';
import Cart from './modules/Cart';
import ProductPage from './modules/productPage';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    colorList: undefined,
  },
  getters: {
    getColorList(state) {
      return state.colorList;
    },
    // getProductsInCart(state) {
    //   const productList = state.Cart.productBasket.map(el => ({
    //     ...el,
    //     ...state.Product.products.find(productEl => el.id === productEl.id),
    //   }));
    //   return productList;
    // },
  },
  actions: {
    loadColors({ commit }) {
      axios.get(`${API_BASE_URL}/api/colors`).then(colorList => {
        commit('setColor', colorList.data.items);
      });
    },
  },
  mutations: {
    setColor(state, colorList) {
      state.colorList = colorList;
    },
  },

  modules: {
    Category,
    Product,
    Cart,
    ProductPage,
  },
});

export default store;
