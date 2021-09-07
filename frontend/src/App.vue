<template>
	<div id="app">
		<router-view :key="$route.fullPath"></router-view>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "App",
	created() {
		axios.interceptors.request.use(
			(config) => {
				config.headers.authorization = `${this.$store.state.user.token}`;
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
