import axios from 'axios';
import { API_BASE_URL } from '../../config';

export default {
  state: {
    page: 1,
    limitProduct: 3,
    countProduct: 0,
    products: null,
    filterPriceFrom: 0,
    filterPriceTo: 0,
    categoryId: 0,
    colorId: 0,
    productsLoading: false,
    errorLoading: false,
  },
  getters: {
    geterrorLoading({ errorLoading }) {
      return errorLoading;
    },
    getProductLoading({ productsLoading }) {
      return productsLoading;
    },
    getProductList(state) {
      return state.products;
    },
    getNumberPage({ page }) {
      return page;
    },
    getLimitProduct({ limitProduct }) {
      return limitProduct;
    },
    getCountProducts({ countProduct }) {
      return countProduct;
    },
    countPage({ limitProduct, countProduct }) {
      return Math.ceil((countProduct / limitProduct));
    },
    getPriceTo({ filterPriceTo }) {
      return filterPriceTo;
    },
    getPriceFrom({ filterPriceFrom }) {
      return filterPriceFrom;
    },
    getCategoriesId({ filtercategoryId }) {
      return filtercategoryId;
    },
    getColorId({ colorId }) {
      return colorId;
    },
  },
  actions: {
    loadProducts({ state, commit }) {
      state.productsLoading = true;
      state.errorLoading = false;
      axios.get(`${API_BASE_URL}/api/products`, {
        params: {
          page: state.page,
          limit: state.limitProduct,
          categoryId: state.categoryId,
          minPrice: state.filterPriceFrom,
          maxPrice: state.filterPriceTo,
          colorId: state.colorId,
        },
      })
        .then(products => {
          commit('setProducts', products);
          state.productsLoading = false;
        })
        .catch(() => {
          state.errorLoading = true;
          state.productsLoading = false;
        });
    },
  },
  mutations: {
    setProducts(state, receiveProduct) {
      state.products = receiveProduct.data.items;
      state.countProduct = receiveProduct.data.pagination.total;
    },
    backPage(state) {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    nextPage(state) {
      if (state.page < Math.ceil((state.countProduct / state.limitProduct))) {
        state.page += 1;
      }
    },
    changePage(state, numberPage) {
      state.page = numberPage;
    },
    changeMinPrice(state, number) {
      state.filterPriceFrom = number;
    },
    changeMaxPrice(state, number) {
      state.filterPriceTo = number;
    },
    changeCategories(state, number) {
      state.categoryId = number;
    },
    changeColorId(state, number) {
      state.colorId = number;
    },
  },
};
