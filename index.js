import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';

import router from './router'
import App from './app'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://bookvue/api';
Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
   auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})