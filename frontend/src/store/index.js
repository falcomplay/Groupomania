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
		deleteUser: function (state, user) {
			let users = state.users.filter((u) => u.id != user.id);
			state.users = users;
		},
		deleteAccount: function (state) {
			state.user = {
				userId: -1,
				token: "",
			};
			localStorage.clear();
		},
		getPosts: function (state, posts) {
			state.posts = posts;
		},
		deletePost: function (state, post) {
			let posts = state.posts.filter((p) => p.id != post.id);
			state.posts = posts;
		},
		getComs: function (state, comments) {
			state.comments = comments;
		},
		deleteComment: function (state, comment) {
			let comments = state.comments.filter((c) => c.id != comment.id);
			state.comments = comments;
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
		signup: ({ commit }, userInfos) => {
			commit("setStatus", "loading");
			return new Promise((resolve, reject) => {
				commit;
				instance
					.post("/auth/signup", userInfos)
					.then(function (response) {
						commit("setStatus", "signup");
						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_signup");
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
		deleteUser: ({ commit }, user) => {
			instance
				.delete(`/users/${user.id}`)
				.then(function (response) {
					if (response.status == 200 || response.status == 204) commit("deleteUser", user.id);
				})
				.catch(function (err) {
					console.log(err);
				});
		},
		deleteAccount: ({ commit }, user) => {
			instance
				.delete(`/users/${user.id}`)
				.then(function (response) {
					if (response.status == 200 || response.status == 204) commit("deleteAccount", user.id);
				})
				.catch(function (err) {
					console.log(err);
				});
		},
		getPostsInfos: ({ commit }) => {
			instance
				.get("/posts")
				.then(function (response) {
					commit("getPosts", response.data.posts);
				})
				.catch(function () {});
		},
		deletePost: ({ commit }, post) => {
			instance
				.delete(`/posts/${post.id}`)
				.then(function (response) {
					if (response.status == 200 || response.status == 204) commit("deletePost", post.id);
				})
				.catch(function () {});
		},
		getComments: ({ commit }) => {
			instance
				.get("/comments")
				.then(function (response) {
					commit("getComs", response.data.comments);
				})
				.catch(function () {});
		},
		deleteComment: ({ commit }, comment) => {
			instance
				.delete(`/comments/${comment.id}`)
				.then(function (response) {
					if (response.status == 200 || response.status == 204) commit("deleteComment", comment.id);
				})
				.catch(function () {});
		},
	},
	modules: {},
});
