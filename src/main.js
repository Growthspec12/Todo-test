import Vue from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import vuetify from './plugins/vuetify'
import "@/style/_style.scss";
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
