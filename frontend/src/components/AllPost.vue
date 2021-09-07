<template>
	<div class="w-full flex-1 md:w-1/2 h-screen md:overflow-y-scroll">
		<div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
			<h1 class="text-xl font-bold">Accueil</h1>
			<i class="far fa-star text-xl text-red-300"></i>
		</div>
		<div class="px-5 py-3 border-b-8 border-lighter flex">
			<div class="flex-none">
				<img v-if="user.avatar === null" src="#" class="h-10 w-10 rounded-full flex-none" />
				<img v-else :src="user.avatar" class="h-10 w-10 rounded-full flex-none" />
			</div>
			<form @submit.prevent="submit" class="w-full px-4">
				<div>
					<input v-model="title" id="title" type="text" placeholder="Titre" class="mt-3 pb-3 w-full focus:outline-none" />
				</div>
				<div>
					<input v-model="content" id="content" placeholder="Quoi de neuf ?" class="mt-3 pb-3 w-full focus:outline-none" />
				</div>
				<div class="pb-9 flex items-center">
					<label class="mb-3 text-primary" for="attachment" />
					<button name="send-image" @click="$refs.image.click()"><i class="text-lg text-red-300 mr-4 far fa-image"></i></button>
					<input style="display: none" type="file" ref="image" @change="onFileSelected()" />
				</div>
				<div v-if="submitStatus == 'error_create'" class="text-red-600">Il manque l'un des paramètres, veuillez tout remplir !</div>
				<div>
					<button :class="{ 'button--disabled': !validatedFields }" name="send-post" class="h-10 px-4 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full">
						<span v-if="submitStatus == 'loading'">Envoie...</span>
						<span v-else>Publier</span>
					</button>
				</div>
			</form>
		</div>
		<div class="flex flex-col">
			<div v-for="(post, id) in posts.slice().reverse()" class="flex flex-col-reverse" :key="id">
				<div class="w-full p-4 border-b hover:bg-lighter flex flex-col">
					<div class="flex mr-4">
						<img
							v-if="
								users
									.map((user) => {
										if (user.id === post.UserId) return user.avatar;
									})
									.join('') !== (null || '')
							"
							:src="
								users
									.map((user) => {
										if (user.id === post.UserId) return user.avatar;
									})
									.join('')
							"
							class="h-12 w-12 rounded-full flex-none"
						/>
						<img v-else src="#" class="h-10 w-10 rounded-full flex-none" />
						<div class="ml-3 flex flex-col">
							<p class="font-semibold">{{ post.username }}</p>
							<p class="font-thin text-sm">{{ dateTime(post.createdAt) }}</p>
						</div>
						<button v-if="user.id == post.UserId || user.isAdmin == 1" @click="deletePost(post)" name="delete" class="ml-auto">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-content hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>
					<div class="w-full">
						<h2 class="text-base text-center py-2">{{ post.title }}</h2>
						<div class="flex align-center justify-center">
							<img
								id="post_img"
								v-if="post.attachment !== '' && post.attachment !== null && (post.attachment.split('.')[2] === 'png' || 'jpg')"
								:src="post.attachment"
								alt="image-video"
							/>
						</div>
						<p class="text-sm py-2">{{ post.content }}</p>
					</div>
					<div class="flex items-center text-sm text-dark">
						<router-link :to="`/poste/${post.id}`"><i class="far fa-comment mr-3"></i></router-link>
						<div>
							{{
								comments.filter((comment) => {
									return comment.PostId == post.id;
								}).length
							}}
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
import moment from "moment";
export default {
	name: "AllPost",
	data: function () {
		return {
			title: "",
			content: "",
			attachment: null,
			submitStatus: null,
		};
	},
	computed: {
		...mapState({
			user: "userInfos",
			users() {
				return this.$store.state.users;
			},
			posts() {
				return this.$store.state.posts;
			},
			comments() {
				return this.$store.state.comments;
			},
		}),
		validatedFields: function () {
			if (this.title != "" && this.content != "") {
				return true;
			} else {
				return false;
			}
		},
	},
	methods: {
		dateTime(value) {
			return moment(value).format("DD-MM-YYYY");
		},
		onFileSelected: function () {
			this.attachment = this.$refs.image.files[0];
		},
		submit() {
			const fd = new FormData();
			if (this.attachment != null || "") {
				fd.append("image", this.attachment, this.attachment.filename);
				fd.append("title", this.title);
				fd.append("content", this.content);
				fd.append("user", this.user);
			} else {
				fd.append("title", this.title);
				fd.append("content", this.content);
				fd.append("user", this.user);
			}
			this.submitStatus = "loading";
			axios
				.post("http://localhost:3000/api/posts/new", fd)
				.then((response) => {
					this.title = response.data;
					this.content = response.data;
					this.attachment = response.data;
					this.$router.go("/");
				})
				.catch((error) => ((this.submitStatus = "error_create"), console.log(error)));
		},

		deletePost: function (post) {
			let response = confirm("Êtes-vous sûr de vouloir supprimer ce post ? ");
			if (response) {
				this.$store.dispatch("deletePost", post);
				this.$router.go("/");
				return;
			}
		},
	},
};
</script>

<style scoped></style>
