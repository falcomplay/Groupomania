<template>
	<div class="container mt-5">
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title mb-4">
							<div class="d-flex justify-content-start align-items-center">
								<div class="image-container">
									<img src="../assets/defaultavatar.png" class="align-items-center avatar rounded-full mb-2" />
									<div class="middle">
										<label class="mb-3 text-primary" for="avatar" />
										<input type="file" ref="image" v-on:change="handleFileUpload()" />
									</div>
								</div>
								<div class="userData ml-3">
									<h2 class="d-block" style="font-size: 1.5rem; font-weight: bold">{{ user.username }}</h2>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-12">
								<div class="tab-content ml-1" id="myTabContent">
									<div class="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
										<div class="row">
											<div class="col-sm-3 col-md-2 col-5">
												<label style="font-weight: bold">Mail</label>
											</div>
											<div class="col-md-8 col-6">{{ user.email }}</div>
											<input v-model="email" type="text" name="email" id="email" />
										</div>
										<hr />
										<div class="row">
											<div class="col-sm-3 col-md-2 col-5">
												<label style="font-weight: bold">Nom</label>
											</div>
											<div class="col-md-8 col-6">{{ user.lastname }}</div>
											<input v-model="lastname" type="lastname" name="lastname" id="lastname" />
										</div>
										<hr />
										<div class="row">
											<div class="col-sm-3 col-md-2 col-5">
												<label style="font-weight: bold">Prénom</label>
											</div>
											<div class="col-md-8 col-6">{{ user.firstname }}</div>
										</div>
										<hr />

										<div class="row">
											<div class="col-sm-3 col-md-2 col-5">
												<label style="font-weight: bold">Bio</label>
											</div>
											<div class="col-md-8 col-6">{{ user.bio }}</div>
										</div>
										<hr />
									</div>
									<div class="px-4 py-3 text-right sm:px-6">
										<button name="publier" @click="submit()" class="h-10 px-4 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full">
											<span v-if="submitStatus == 'loading'">Envoie...</span>
											<span v-else>Publier</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
	name: "Profile",
	created: function () {
		this.$store.dispatch("getUsers");
		this.$store.dispatch("getUserInfos");
	},
	data: function () {
		return {
			mode: "userProfile",
			submitStatus: null,
			firstname: "",
			lastname: "",
			email: "",
			bio: "",
			avatar: null,
		};
	},
	computed: {
		...mapState({
			user: "userInfos",
		}),
	},
	methods: {
		handleFileUpload() {
			this.avatar = this.$refs.image.files[0];
		},
		submit() {
			const fd = new FormData();
			if (this.avatar != null || "") {
				fd.append("image", this.avatar, this.avatar.filename);
				fd.append("firstname", this.firstname);
				fd.append("lastname", this.lastname);
				fd.append("email", this.email);
				fd.append("bio", this.bio);
			} else {
				fd.append("firstname", this.firstname);
				fd.append("lastname", this.lastname);
				fd.append("email", this.email);
				fd.append("bio", this.bio);
			}
			this.submitStatus = "loading";
			axios.put("http://localhost:3000/api/users/userId", fd, {}).then((response) => {
				this.firstname = response.data;
				this.lastname = response.data;
				this.email = response.data;
				this.bio = response.data;
				this.avatar = response.data;
				this.$router.go("/profile");
			});
		},
		deleteAccount: function (user) {
			let response = confirm("Êtes-vous sûr de vouloir supprimer ce compte? ");
			if (response) {
				this.$store.dispatch("deleteAccount", user);
				this.$router.push("/userProfileDelete");
				return;
			}
		},
	},
};
</script>

<style scoped>
.alert {
	color: #b12f38;
}
.avatar {
	width: 100px;
	height: 100px;
}
.btn {
	background-color: #192946;
	color: white;
}
textarea {
	resize: none;
}
</style>
