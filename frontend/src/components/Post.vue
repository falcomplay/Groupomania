<template>
	<div class="col-12 col-lg-8 col-xl-8 mx-auto my-3 py-4">
		<div class="card col-12 col-lg-8 col-xl-8 mx-auto my-5 bg-white py-4">
			<div class="ml-lg-3 d-flex flex-column">
				<div class="d-flex">
					<img
						v-if="
							users
								.map((user) => {
									if (user.id === post.userId) return user.avatar;
								})
								.join('') !== (null || '')
						"
						:src="
							users
								.map((user) => {
									if (user.id === post.userId) return user.avatar;
								})
								.join('')
						"
						class="avatar-post rounded-circle"
						alt="avatar"
					/>
					<img v-else src="../assets/defaultavatar.png" alt="avatar" class="align-items-center avatar-post rounded-full" />
					<div class="ml-auto mr-2 d-flex align-items-center justify-content-end">
						<div class="mr-3">{{ dateTime(post.createdAt) }}</div>
						<button v-if="user.id == post.UserId || user.isAdmin == 1" @click="deletePost(post)" name="delete" class="btn d-flex justify-content-end">x</button>
					</div>
				</div>
				<div class="mt-1 d-flex justify-content-start">{{ post.userName }}</div>
				<div>
					<h2 class="text-base text-center py-2">{{ post.title }}</h2>
					<div class="mt-4">
						<img class="w-100" id="post_img" :src="post.attachment" alt="image-video" />
					</div>
					<p class="text-sm mt-2 py-2">{{ post.content }}</p>
				</div>
				<div v-for="(comment, id) in comments" class="d-flex justify-content-center mt-4 py-2 col-12" :key="id">
					<div class="d-flex justify-content-center flex-row w-100">
						<div>
							<img
								v-if="
									users
										.map((user) => {
											if (user.id === comment.userId) return user.avatar;
										})
										.join('') !== (null || '')
								"
								:src="
									users
										.map((user) => {
											if (user.id === comment.userId) return user.avatar;
										})
										.join('')
								"
								alt="avatar"
								class="avatar rounded-circle"
							/>
							<img v-else src="../assets/defaultavatar.png" alt="avatar" class="align-items-center avatar rounded-full" />
							<p class="my-2">{{ comment.userName }}</p>
						</div>
						<div class="d-flex align-items-center justify-content-center ml-3 w-50">
							<p class="text-sm">{{ comment.comment }}</p>
						</div>
						<button v-if="user.id == comment.userId || user.isAdmin == 1" @click="deleteComment(comment)" name="delete" class="btn ml-3 align-self-center">
							<span>X</span>
						</button>
					</div>
				</div>
				<form @submit.prevent="submitCom()" class="mx-auto mt-2 d-flex flex-column w-50">
					<div class="d-flex flex-column">
						<label for="comment" class="sr-only">Commentaire</label>
						<textarea type="text" v-model="comment" id="comment" placeholder="Mettez un commentaire..." rows="2" class="mt-3 col-12" />
						<button name="send-comment" class="btn mt-3">
							<span v-if="submitStatus == 'loading'">Envoie...</span>
							<span v-else>Commenter</span>
						</button>
					</div>
					<div v-if="submitStatus == 'error_create'" class="alert">Vous devez mettre un commentaire</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
	name: "Post",
	data() {
		return {
			id: this.$route.params.id,
			post: [],
			comments: [],
			comment: "",
			submitStatus: null,
		};
	},
	created() {
		axios.get(`http://localhost:3000/api/posts/${this.id}`).then((response) => {
			this.post = response.data.post;
			if (this.post) {
				this.comments = response.data.comments;
			}
		});
		this.$store.dispatch("getUsers");
		this.$store.dispatch("getUserInfos");
	},
	computed: {
		...mapState({
			user: "userInfos",
			users() {
				return this.$store.state.users;
			},
		}),

		formattedDate() {
			return moment(this.post.createdAt).format("DD-MM-YYYY");
		},
	},
	methods: {
		dateTime(value) {
			return moment(value).format("DD-MM-YYYY");
		},
		deletePost: function (post) {
			let response = confirm("Êtes-vous sûr de vouloir supprimer ce post ? ");
			if (response) {
				this.$store.dispatch("deletePost", post);
				this.$router.push("/home");
				return;
			}
		},
		submitCom: function () {
			this.submitStatus = "loading";
			axios
				.post(`http://localhost:3000/api/comments/${this.id}`, {
					comment: this.comment,
				})
				.then((response) => {
					this.comment = response.data.comment;
					this.$router.go("/");
				})
				.catch((error) => ((this.submitStatus = "error_create"), console.log(error)));
		},
		deleteComment: function (comment) {
			let response = confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ? ");
			if (response) {
				this.$store.dispatch("deleteComment", comment);
				this.$router.go("/");
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
.avatar-post {
	width: 70px;
	height: 70px;
}
.avatar {
	width: 50px;
	height: 50px;
}
.btn {
	background-color: #192946;
	color: white;
}

textarea {
	resize: none;
}
</style>
