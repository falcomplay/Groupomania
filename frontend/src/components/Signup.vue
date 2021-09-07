<template>
	<div class="pt-3 pb-5">
		<div class="card col-10 col-lg-6 mx-auto bg-white py-4">
			<h1 class="h3 text-secondary mt-3">Bienvenue chez groupamania</h1>
			<p>Rejoignez Groupomania maintenant pour entrer en contact avec la communauté</p>
			<form id="form" class="mt-3 mb-4" method="post" novalidate="true">
				<div class="form-group form-group-sm">
					<div class="col mx-auto position-relative">
						<label for="username">Pseudo</label>
						<input id="username" name="username" type="text" class="col-7 col-lg-6 mx-auto form-control form-control-sm" v-model.trim="$v.username.$model" required />
					</div>
				</div>
				<div class="form-group form-group-sm">
					<div class="col mx-auto position-relative">
						<label for="email">Email</label>
						<input id="email" name="email" type="email" class="col-7 col-lg-6 mx-auto form-control form-control-sm" v-model.trim="$v.email.$model" required />
					</div>
				</div>
				<div class="form-group form-group-sm">
					<div class="col mx-auto position-relative">
						<label for="password">Mot de passe</label>
						<input id="password" name="password" type="password" class="col-7 col-lg-6 mx-auto form-control form-control-sm" v-model.trim="$v.password.$model" required />
					</div>
				</div>
				<div class="form-group form-group-sm">
					<div class="col mx-auto position-relative">
						<label for="confirmation">Confirmation du mot de passe</label>
						<input id="confirmation" name="confirmation" type="password" class="col-7 col-lg-6 mx-auto form-control form-control-sm" v-model.trim="$v.confirmation.$model" required />
					</div>
				</div>
				<button class="btn btn-sm mt-3" type="submit" @click.prevent="signup">S'inscrire</button>
			</form>
			<div class="pt-5">
				<p>
					Déjà inscrit ? Connectez vous<router-link :to="{ path: '/' }"><a> ici !</a></router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
	name: "signup",
	data() {
		return {
			username: "",
			email: "",
			password: "",
			confirmation: "",
			submited: false,
			blankFields: false,
			differentPassword: false,
			alert: [],
		};
	},
	// is the references for xxx.$model in html part
	validations: {
		username: {
			required,
			minLength: minLength(5),
		},
		email: {
			required,
			email,
		},
		password: {
			required,
			minLength: minLength(6),
		},
		confirmation: {
			required,
		},
	},
	methods: {
		signup() {
			this.blankFields = false;
			this.differentPassword = false;
			this.alert = [0]; // reboot alerts before each try
			this.$v.$touch(); // checks for errors

			if (!this.email || !this.password || !this.username || !this.confirmation) {
				this.blankFields = true;
			} else {
				if (this.password == this.confirmation) {
					this.submited = true;
					axios
						.post("http://localhost:3000/api/auth/signup", {
							username: this.username,
							email: this.email,
							password: this.password,
						})
						.then(() => {
							alert("Compte créé avec succès");
							localStorage.setItem("username", this.username);
							this.$router.push("/");
						})
						.catch((error) => {
							if (error.response) {
								this.alert = error.response.status;
							}
						});
				} else {
					this.differentPassword = true;
				}
			}
		},
	},
};
</script>

<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
.btn {
	background-color: #192946;
	color: white;
}
a {
	color: #b12f38;
}
</style>
