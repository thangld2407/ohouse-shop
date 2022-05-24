import Vue from "vue";
import App from "./pages/App.vue";

// router
import router from "./router";
Vue.use(router);
// Component library
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Icon Library
import "./assets/font-awesome/css/all.min.css";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
