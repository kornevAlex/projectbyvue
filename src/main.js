import Vue from 'vue';
import App from './App.vue';
import { oneMessage, twoMessage } from './2_Task/state';
import showText from './2_Task/function';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
showText(oneMessage);
showText(twoMessage);
