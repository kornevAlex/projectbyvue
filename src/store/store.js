import Vue from 'vue';
import Vuex from 'vuex';
import Category from './modules/Category';
import Product from './modules/Product';
import Cart from './modules/Cart';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    colorList: [
      '#73B6EA', '#ffbe15', '#939393', '#8BE000', '#ff6b00', '#fff', '#222',
    ],
  },
  getters: {
    getColorList(state) {
      return state.colorList;
    },
    getProductsInCart(state) {
      const productList = state.Cart.productBasket.map((el) => ({
        ...el,
        ...state.Product.products.find((productEl) => el.id === productEl.id),
      }));
      return productList;
    },
  },

  modules: {
    Category,
    Product,
    Cart,
  },
});

export default store;
