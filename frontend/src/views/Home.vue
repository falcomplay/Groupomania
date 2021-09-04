<template>
	<div class="home">
		<Navbar />
		<Post />
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Post from "@/components/Post.vue";

export default {
	name: "Home",
	components: {
		Navbar,
		Post,
	},
};
</script>

<style scoped>
img {
	width: 50%;
	min-width: 220px;
	max-width: 500px;
	margin-bottom: 20px;
}
</style>
