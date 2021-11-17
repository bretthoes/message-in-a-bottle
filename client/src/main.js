import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store/store'
import VueSimpleAlert from 'vue-simple-alert'

// Import Bootstrap an BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Make alerts available throughout project
Vue.use(VueSimpleAlert)

Vue.config.productionTip = false

// sync router to store so when route is updated store is updated as well
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
