<template>
	<div class="container mt-5">
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="card-title mb-4">
							<div class="d-flex justify-content-start align-items-center">
								<div class="image-container">
									<div class="d-flex flex-column align-items-center">
										<img v-if="user.avatar === null" src="../assets/defaultavatar.png" class="avatar rounded-circle mb-2" />
										<img v-else :src="user.avatar" alt="image-profil" class="avatar rounded-circle mb-2" />
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
											<input v-model="firstname" type="firstname" name="firstname" id="firstname" />
										</div>
										<hr />

										<div class="row">
											<div class="col-sm-3 col-md-2 col-5">
												<label style="font-weight: bold">Bio</label>
											</div>
											<div class="col-md-8 col-6">{{ user.bio }}</div>
											<input v-model="bio" type="bio" name="bio" id="bio" />
										</div>
										<hr />
									</div>
									<div class="d-flex justify-content-around px-4 py-3">
										<button name="delete" @click="deleteAccount(user)" class="btn btn-alert">
											<span v-if="submitStatus == 'loading'">Suppression...</span>
											<span v-else>Supprimer le compte</span>
										</button>
										<button name="publier" @click="submit()" class="btn">
											<span v-if="submitStatus == 'loading'">Mise à jour...</span>
											<span v-else>Modifier</span>
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
			users() {
				return this.$store.state.users;
			},
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
		deleteAccount(user) {
			let response = confirm("Êtes-vous sûr de vouloir supprimer ce compte? ");
			if (response) {
				this.$store.dispatch("deleteAccount", user);
				this.$router.push("/");
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
.btn-alert {
	background-color: #b12f38;
}
textarea {
	resize: none;
}
</style>
