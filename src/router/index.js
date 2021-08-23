import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../components/MainPage/MainPage.vue';
import PageNoFound from '../components/MainPage/PageNoFound/PageNoFound.vue';
import ProductPage from '../components/ProductPage/ProductPage.vue';
import Cart from '../components/MainPage/Cart/CartPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'noFound', component: PageNoFound, path: '*' },
  { name: 'cart', component: Cart, path: '/cart' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
