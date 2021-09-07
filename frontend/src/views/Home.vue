<template>
	<div class="home">
		<Navbar />
		<AllPost />
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import AllPost from "@/components/AllPost.vue";
// import Amis from '@/components/Amis.vue';
export default {
	created() {
		this.$store.dispatch("getUsers");
		this.$store.dispatch("getUserInfos");
		this.$store.dispatch("getPostsInfos");
	},
	name: "Home",
	components: {
		Navbar,
		AllPost,
	},
};
</script>
