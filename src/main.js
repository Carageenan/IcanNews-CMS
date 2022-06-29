import "regenerator-runtime/runtime";
import Vue from "vue";
import App from "./App.vue";
import GoogleAuth from "vue-google-auth";

Vue.use(GoogleAuth, { clientID: "184769327491-nb6t3abhg0qbva7kb0a997a6dd5t8kf9.apps.googleusercontent.com" });
Vue.googleAuth().load();

new Vue({
  render: (el) => {
    return el(App);
  },
}).$mount("#app");
