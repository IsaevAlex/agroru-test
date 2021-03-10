import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mainLayout from '@/views/layouts/mainLayout.vue'
import errorLayout from '@/views/layouts/errorLayout.vue'
// import axios from 'axios'
import VueMaterial from 'vue-material'
import vSelect from 'vue-select'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);
Vue.use(VueMaterial);
Vue.component('main-layout', mainLayout);
Vue.component('error-layout', errorLayout);
Vue.config.productionTip = false;

Vue.material.locale.dateFormat = 'dd.MM.yyyy';
Vue.material.locale.firstDayOfAWeek = 1;

// axios.interceptors.response.use(undefined, function(error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       store.dispatch("LOGOUT");
//       return router.push("/");
//     }
//
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
