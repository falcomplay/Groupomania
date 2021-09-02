import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuelidate from "vuelidate";

import "./styles/app.scss";
import router from "./router";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

/* eslint-disable no-new */
new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");