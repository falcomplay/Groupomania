import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";

Vue.use(Vuex);

const instance = axios.create({
	baseURL: "http://localhost:3000/api/",
});

let user = localStorage.getItem("user");
if (!user) {
	user = {
		userId: -1,
		token: "",
	};
} else {
	try {
		user = JSON.parse(user);
		instance.defaults.headers.common["Authorization"] = user.token;
	} catch (ex) {
		user = {
			userId: -1,
			token: "",
		};
	}
}

export default new Vuex.Store({
	state: {
		status: "",
		user: user,
		userInfos: {
			email: "",
			username: "",
			firstname: "",
			lastname: "",
			avatar: "",
		},
		posts: [],
		comments: [],
		users: [],
	},
	mutations: {
		setStatus: function (state, status) {
			state.status = status;
		},
		logUser: function (state, user) {
			instance.defaults.headers.common["Authorization"] = user.token;
			localStorage.setItem("user", JSON.stringify(user));
			state.user = user;
		},
		userInfos: function (state, userInfos) {
			state.userInfos = userInfos;
		},
		getUsers: function (state, users) {
			state.users = users;
		},
		getPosts: function (state, posts) {
			state.posts = posts;
		},
		logout: function (state) {
			state.user = {
				userId: -1,
				token: "",
			};
			localStorage.clear();
		},
	},
	actions: {
		login: ({ commit }, userInfos) => {
			commit("setStatus", "loading");
			return new Promise((resolve, reject) => {
				instance
					.post("/auth/login", userInfos)
					.then(function (response) {
						commit("setStatus", "");
						commit("logUser", response.data);
						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_login");
						reject(error);
					});
			});
		},
		createAccount: ({ commit }, userInfos) => {
			commit("setStatus", "loading");
			return new Promise((resolve, reject) => {
				commit;
				instance
					.post("/auth/signup", userInfos)
					.then(function (response) {
						commit("setStatus", "created");
						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_create");
						reject(error);
					});
			});
		},
		getUserInfos: ({ commit }) => {
			instance
				.get("/users/userId")
				.then(function (response) {
					commit("userInfos", response.data);
				})
				.catch(function () {});
		},
		getUsers: ({ commit }) => {
			instance
				.get("/users")
				.then(function (response) {
					commit("getUsers", response.data);
				})
				.catch(function () {});
		},
		getPostsInfos: ({ commit }) => {
			instance
				.get("/posts")
				.then(function (response) {
					commit("getPosts", response.data.posts);
				})
				.catch(function () {});
		},
	},
	modules: {},
});
