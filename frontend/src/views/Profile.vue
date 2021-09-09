<template>
	<div class="profile">
		<Navbar />
		<Profile />
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Profile from "@/components/Profile.vue";
export default {
	name: "ProfilePage",
	components: {
		Navbar,
		Profile,
	},
};
</script>
