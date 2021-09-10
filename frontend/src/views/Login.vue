<template>
	<div class="login">
		<img alt="Groupomania logo" src="../styles/icon/icon-font.png" />
		<Login />
	</div>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
	name: "HomeLogin",
	components: {
		Login,
	},
};
</script>

<style scoped>
img {
	width: 50%;
	min-width: 220px;
	max-width: 500px;
}
</style>
