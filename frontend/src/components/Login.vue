<template>
	<div class="pt-3 pb-5">
		<div class="card col-10 col-lg-6 mx-auto bg-white py-4">
			<h1 class="h3 text-secondary mt-3">Bienvenue chez groupamania</h1>
			<p>Rejoignez Groupomania maintenant pour entrer en contact avec la communauté</p>
			<p></p>
			<form id="form" class="mt-3 mb-4" novalidate="true">
				<div class="form-group form-group-sm">
					<div class="col mx-auto position-relative">
						<label for="email">Email</label>
						<input id="email" name="email" type="text" class="col-7 col-lg-6 mx-auto form-control form-control-sm" required />
					</div>
				</div>
				<div class="form-group form-group-sm">
					<div class="col mx-auto position-relative">
						<label for="password">Mot de passe</label>
						<input id="password" name="password" type="text" class="col-7 col-lg-6 mx-auto form-control form-control-sm" required />
					</div>
				</div>
				<button class="btn btn-sm mt-3" type="submit" @click.prevent="login">Se connecter</button>
			</form>
			<div class="pt-5">
				<p>
					Pas de compte ? Inscrivez vous <router-link :to="{ path: '/signup' }"><a>ici !</a></router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
	name: "login",
	data() {
		return {
			email: "",
			password: "",
			submited: false,
			isActive: true,
			errorAlert: false,
		};
	},

	validations: {
		email: {
			email,
			required,
		},
		password: {
			required,
			minLength: minLength(6),
		},
	},
	methods: {
		// activatedBtn() {
		// 	const email = document.getElementById("email").value;
		// 	const password = document.getElementById("password").value;
		// 	if (email !== null && password !== null) {
		// 		this.isActive = false;
		// 	}
		// },

		login() {
			this.errorAlert = false; // reboot alert before each try

			axios
				.post("http://localhost:3000/api/auth/login", {
					email: this.email,
					password: this.password,
				})
				.then((res) => {
					localStorage.setItem("token", res.data.token);
					localStorage.setItem("userId", res.data.userId);
					localStorage.setItem("isAdmin", res.data.isAdmin);
					this.$router.push("/home");
				})
				.catch(() => {
					this.errorAlert = true;
				});
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
