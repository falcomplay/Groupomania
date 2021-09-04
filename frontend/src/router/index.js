import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/signup",
		name: "Signup",
		component: () => import("../views/Signup.vue"),
	},
	{
		path: "/Login",
		name: "Login",
		component: () => import("../views/Login.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
