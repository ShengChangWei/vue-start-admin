import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import 'font-awesome/css/font-awesome.css';
import '@/styles/bootstrap.css';
//  reset CSS
import 'normalize.css/normalize.css';
import '@/styles/index.scss'; // global css
import '@/assets/fonts/iconfont.css';
import '@/assets/fonts/sysiconfont.css';
import EVueContextmenu from 'e-vue-contextmenu';
import EVueEsrimapjs from 'e-vue-esrimapjs';

Vue.use(EVueEsrimapjs);
Vue.use(EVueContextmenu);
Vue.use(Element);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
