import Vue from 'vue';
import Vuex from 'vuex';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import store from './store';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
