import axios from 'axios';
import { API_BASE_URL } from '../../config';

export default {
  state: {
    loadBasket: false,
    errorBasket: false,
    productBasket: [],
    userAccessKey: null,
    orderInfo: null,
  },
  actions: {
    loadOrderInfo({ state, commit }, orderId) {
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: state.userAccessKey,
        },
      }).then(resp => {
        commit('updateOrderInfo', resp.data);
      });
    },
    loadCart({ state, commit }) {
      state.loadBasket = true;
      state.errorBasket = false;
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: state.userAccessKey,
        },
      })
        .then(response => {
          if (!state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
          }
          state.loadBasket = false;
          commit('setBasket', response.data.items);
          commit('setUserAccessKey', response.data.user.accessKey);
        })
        .catch(() => {
          state.loadBasket = false;
          state.errorBasket = true;
        });
    },
    addProducttoServer({ state, commit }, body) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId: body.id,
        quantity: body.count,
      }, {
        params: {
          userAccessKey: state.userAccessKey,
        },
      }).then(response => {
        commit('setBasket', response.data.items);
      });
    },
    updateProductCart({ state, commit }, body) {
      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId: body.id,
        quantity: body.count,
      }, {
        params: {
          userAccessKey: state.userAccessKey,
        },
      }).then(() => {
        commit('updateCountProduct', body);
      });
    },
    deleteProductInBasket({ state, commit }, id) {
      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        params: {
          userAccessKey: state.userAccessKey,
        },
        data: {
          productId: id,
        },
      }).then(() => {
        commit('deleteProductInCart', id);
      });
    },
  },
  mutations: {
    updateOrderInfo(state, order) {
      state.orderInfo = order;
    },
    resetBasket(state) {
      state.productBasket = [];
    },
    setBasket(state, basket) {
      state.productBasket = basket.map(product => ({
        idInCart: product.id,
        count: product.quantity,
        ...product.product,
      }));
    },
    setUserAccessKey(state, key) {
      state.userAccessKey = key;
    },
    addProduct(state, product) {
      state.productBasket.push(product[product.length - 1]);
    },
    updateCountProduct({ productBasket }, { id, count }) {
      const item = productBasket.find(el => el.id === id);
      if (item) {
        item.count = count;
      }
    },
    deleteProductInCart(state, id) {
      state.productBasket = state.productBasket.filter(el => el.id !== id);
    },
  },
  getters: {
    getProductInCart({ productBasket }) {
      return productBasket;
    },
    getTotalCost(state) {
      const arr = state.productBasket;
      if (arr.length === 1) {
        return arr[0].price * arr[0].count;
      }
      return arr.length ? arr
        .reduce((a, b) => a + b.price * b.count, 0) : 0;
    },
    getCountProduct({ productBasket }) {
      return productBasket.length;
    },
    getLoadBasket({ loadBasket }) {
      return loadBasket;
    },
    getErrorLoadBasket({ errorBasket }) {
      return errorBasket;
    },
    getUserAccessKey({ userAccessKey }) {
      return userAccessKey;
    },
    getOrderInfo({ orderInfo }) {
      return orderInfo;
    },
  },
};
