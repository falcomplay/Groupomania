<template>
	<div class="pt-3 pb-5">
		<div class="card col-10 col-lg-5 mx-auto bg-white py-4">
			<div class="ml-3 d-flex flex-row">
				<img alt="image-profil" class="h-12 w-12 rounded-full" />
				<p class="font-semibold">Test</p>
				<p class="font-thin text-sm">Date</p>
				<button name="delete" class="ml-auto w-8 h-8">Delete</button>
			</div>
			<h1 class="h3 text-secondary mt-3">Bienvenue chez groupamania</h1>
			<p>Rejoignez Groupomania maintenant pour entrer en contact avec la communauté</p>
			<img id="post_img" alt="image-post" />
			<div class="flex w-full flex-col justify-center bg-red-50 mt-4 py-2">
				<div class="flex">
					<div>
						<img alt="image-profil" class="ml-2 h-10 w-10 rounded-full flex-none" />
					</div>
					<div class="flex flex-col ml-3">
						<p class="mb-2">Username comment}</p>
						<p class="text-sm">Comment</p>
					</div>
					<button name="delete" class="ml-auto flex-end w-8 h-8"></button>
				</div>
			</div>
			<form class="mt-2">
				<div class="flex">
					<img class="md:ml-2 h-10 w-10 rounded-full flex-none" />
					<input type="text" placeholder="Commentaire..." class="focus:outline-none w-full ml-2" />
					<button class="sm:px-3 h-9 px-2 text-white font-semibold bg-red-600 hover:bg-red-400 focus:outline-none rounded-full">
						<span>Envoie...</span>
						<span>Publier</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script></script>

<style scoped></style>
