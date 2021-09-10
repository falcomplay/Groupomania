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
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
#app {
	font-family: "Roboto", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
