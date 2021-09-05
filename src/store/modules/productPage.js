import axios from 'axios';
import { API_BASE_URL } from '../../config';

export default {
  state: {
    productLoading: false,
    errorLoadingProduct: false,
    product: null,
  },
  getters: {
    getProduct({ product }) {
      return product;
    },
    getErrorLoadingProduct({ errorLoadingProduct }) {
      return errorLoadingProduct;
    },
    getProductLoadingPage({ productLoading }) {
      return productLoading;
    },
  },
  actions: {
    loadProductPage({ state, commit }, id) {
      state.productLoading = true;
      state.errorLoadingProduct = false;
      axios.get(`${API_BASE_URL}/api/products/${id}`)
        .then(result => {
          commit('setProduct', result.data);
          state.productLoading = false;
        }).catch(() => {
          state.errorLoadingProduct = true;
          state.productLoading = false;
        });
    },
  },
  mutations: {
    setProduct(state, product) {
      state.product = product;
    },
  },
};
