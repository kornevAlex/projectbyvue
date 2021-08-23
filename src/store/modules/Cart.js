export default {
  state: {
    productBasket: [

    ],
  },
  mutations: {
    addProduct(state, product) {
      const item = state.productBasket.find((el) => el.id === product.id);
      if (item) {
        item.count += product.count;
      } else {
        state.productBasket.push(product);
      }
    },
    updateCountProduct({ productBasket }, { id, count }) {
      const item = productBasket.find((el) => el.id === id);
      if (item) {
        item.count = count;
      }
    },
    deleteProductInCart(state, id) {
      state.productBasket = state.productBasket.filter((el) => el.id !== id);
    },
  },
  getters: {
    getProductInCart(state) {
      return [...state.productBasket];
    },
    getTotalCost(state, getters) {
      const arr = getters.getProductsInCart;
      if (arr.length === 1) {
        return arr[0].price * arr[0].count;
      }
      return arr.length ? arr.reduce((a, b) => a.price * a.count + b.price * b.count) : 0;
    },
    getCountProduct({ productBasket }) {
      return productBasket.length;
    },
  },
};
