<template>
	<div class="pt-3 pb-5">
		<div class="card col-10 col-lg-6 mx-auto bg-white py-4">
			<h1 class="h2 mt-3" v-if="mode == 'signup'">Bienvenue chez groupamania</h1>
			<p v-if="mode == 'signup'">Rejoignez Groupomania maintenant pour entrer en contact avec la communauté</p>
			<h2 class="card__title h3" v-if="mode == 'login'">Connexion</h2>
			<h2 class="card__title h3" v-else>Inscription</h2>
			<form id="form" class="mt-3" novalidate="true">
				<div class="col mx-auto position-relative">
					<input v-model="email" class="col-7 col-lg-6 mx-auto form-control form-control-sm" type="text" placeholder="Adresse mail" />
				</div>
				<div class="col mx-auto position-relative my-3" v-if="mode == 'signup'">
					<input v-model="username" class="col-7 col-lg-6 mx-auto form-control form-control-sm" type="text" placeholder="Pseudo" />
				</div>
				<div class="col mx-auto position-relative my-3">
					<input v-model="password" class="col-7 col-lg-6 mx-auto form-control form-control-sm" type="password" placeholder="Mot de passe" />
				</div>
				<div class="col mx-auto position-relative alert" v-if="mode == 'login' && status == 'error_login'">Adresse mail/mot de passe invalide</div>
				<div class="col mx-auto position-relative alert" v-if="mode == 'signup' && status == 'error_signup'">Adresse mail déjà utilisée</div>
			</form>
			<div class="mb-3">
				<button @click="login()" name="login" class="btn btn-sm" :class="{ 'button--disabled': !validatedFields }" v-if="mode == 'login'">
					<span v-if="status == 'loading'">Connexion en cours...</span>
					<span v-else>Connexion</span>
				</button>
				<button @click="signup()" name="signup" class="btn btn-sm" :class="{ 'button--disabled': !validatedFields }" v-else>
					<span v-if="status == 'loading'">Création en cours...</span>
					<span v-else>Créer mon compte</span>
				</button>
			</div>
			<p class="pt-3" v-if="mode == 'login'">Pas de compte ? <a class="link" @click="switchToSignup()">Inscrivez vous</a></p>
			<p class="pt-3" v-else>Déjà inscrit ? <a class="link" @click="switchToLogin()"> Connectez vous</a></p>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Login",
	data: function () {
		return {
			mode: "login",
			email: "",
			username: "",
			password: "",
		};
	},
	computed: {
		validatedFields: function () {
			if (this.mode == "signup") {
				if (this.email != "" && this.username != "" && this.password != "") {
					return true;
				} else {
					return false;
				}
			} else {
				if (this.email != "" && this.password != "") {
					return true;
				} else {
					return false;
				}
			}
		},
		...mapState(["status"]),
	},
	methods: {
		switchToSignup: function () {
			this.mode = "signup";
		},
		switchToLogin: function () {
			this.mode = "login";
		},
		signup: function () {
			const self = this;
			this.$store
				.dispatch("signup", {
					email: this.email,
					username: this.username,
					password: this.password,
				})
				.then(
					function () {
						self.login();
					},
					function (error) {
						console.log(error);
					}
				);
		},
		login: function () {
			const self = this;
			this.$store
				.dispatch("login", {
					email: this.email,
					password: this.password,
				})
				.then(
					function () {
						self.$router.push("/home");
					},
					function (error) {
						console.log(error);
					}
				);
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
a,
.alert {
	color: #b12f38;
}
</style>
