import axios from 'axios';
import { API_BASE_URL } from '../../config';

export default {
  state: {
    categories: [{
      id: 0,
      title: 'Все категории',
    }],
  },
  getters: {
    getCategory(state) {
      return state.categories;
    },
  },
  actions: {
    loadCategory({ commit }) {
      axios.get(`${API_BASE_URL}/api/productCategories`).then(categories => {
        commit('setCategories', categories.data.items);
      });
    },
  },
  mutations: {
    setCategories(state, getCategories) {
      state.categories = [...state.categories, ...getCategories];
    },
  },
};
