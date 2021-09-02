<template>
	<div class="home">
		<img alt="Groupomania logo" src="../styles/icon/icon-font.png" />
		<HelloWorld />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "Home",
	components: {
		HelloWorld,
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
