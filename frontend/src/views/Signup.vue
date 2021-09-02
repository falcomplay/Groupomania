<template>
	<div class="home">
		<img alt="Groupomania logo" src="../styles/icon/icon-font.png" />
		<Signup />
	</div>
</template>

<script>
// @ is an alias to /src
import Signup from "@/components/Signup.vue";

export default {
	name: "HomeSignup",
	components: {
		Signup,
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
