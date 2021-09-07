import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../components/MainPage/MainPage.vue';
import PageNoFound from '../components/MainPage/PageNoFound/PageNoFound.vue';
import ProductPage from '../components/ProductPage/ProductPage.vue';
import Cart from '../components/MainPage/Cart/CartPage.vue';
import Order from '../components/MainPage/OrderPage/Order.vue';
import OrderInfo from '../components/MainPage/OrderPage/OrderInfo.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'cart', component: Cart, path: '/cart' },
  { name: 'order', component: Order, path: '/order' },
  { name: 'noFound', component: PageNoFound, path: '*' },
  { name: 'orderInfo', component: OrderInfo, path: '/orderinfo/:id' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
