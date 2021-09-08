import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: () => import("../views/Login.vue"),
		meta: {
			title: "Connexion",
			requiresVisitor: true,
		},
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("../views/Home.vue"),
		meta: {
			title: "Accueil",
			requiresAuth: true,
		},
	},
	{
		name: "post",
		path: "/post/:id",
		component: () => import("../views/Post.vue"),
		meta: {
			title: "Post",
			requiresAuth: true,
		},
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((routes) => routes.meta.requiresAuth)) {
		if (!store.state.user.token) {
			next({
				name: "Login",
			});
		} else {
			next();
		}
	} else if (to.matched.some((routes) => routes.meta.requiresVisitor)) {
		if (store.state.user.token) {
			next({
				name: "home" || "post",
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

router.afterEach((to, from) => {
	console.log(from, to);
	document.title = to.meta.title;
});

export default router;
