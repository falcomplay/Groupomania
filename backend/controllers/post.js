//Imports
const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");
const fs = require("fs");

//routes
exports.createPost = async (req, res) => {
	const headerAuth = req.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);

	const title = req.body.title;
	const content = req.body.content;
	const attachment = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "";

	await models.User.findOne({
		where: { id: userId },
	})
		.then(async function (user) {
			if (user) {
				let user = await models.User.findOne({ where: { id: userId } });
				let newPost = await models.Post.create({
					title: title,
					content: content,
					attachment: attachment,
					likes: 0,
					UserId: user.id,
					userName: user.username,
				});
				return res.status(201).json({ newPost: newPost });
			} else {
				res.status(404).json({ error: "Utilisateur introuvable" });
			}
		})
		.catch(function (err) {
			return res.status(500).json({ error: err });
		});
};

exports.findOnePost = async (req, res) => {
	const headerAuth = req.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);

	await models.Post.findOne({
		attributes: ["id", "title", "userName", "userId", "content", "attachment", "createdAt"],
		where: { id: req.params.id },
	})
		.then(async function (post) {
			await models.User.findOne({
				attributes: ["userName"],
				where: { id: userId },
			})
				.then(async function (user) {
					await models.Comment.findAll({
						attributes: ["comment", "userName", "id", "userId"],
						where: { postId: req.params.id },
					})
						.then(function (comments) {
							const getComment = { post, comments };
							res.status(200).json(getComment);
						})
						.catch(function (err) {
							console.log(err);
							res.status(500).json({ error: err });
						});
				})
				.catch(function (err) {
					console.log(err);
					res.status(500).json({ error: err });
				});
		})
		.catch(function (err) {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.findAllPost = (req, res) => {
	models.Post.findAll()
		.then(function (posts) {
			if (posts) {
				res.status(200).json({ posts: posts });
			} else {
				res.status(404).json({ error: "no post found" });
			}
		})
		.catch(function (err) {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.deleteOnePost = async (req, res) => {
	// Getting auth header
	const headerAuth = req.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	const isAdmin = jwtUtils.getAdmin(headerAuth);

	await models.User.findOne({
		where: { id: userId },
	})
		.then(async () => {
			try {
				const post = await models.Post.findOne({ where: { id: req.params.id } });

				if (userId == post.UserId || isAdmin === true) {
					const filename = post.attachment.split("/images/")[1];
					fs.unlink(`images/${filename}`, () => {
						post.destroy();
						return res.json({ message: "Post supprimé" });
					});
				} else {
					res.status(404).json({ error: "Problème authentification" });
				}
			} catch (err) {
				return res.status(500).json({ err: "haha" });
			}
		})
		.catch(function (err) {
			return res.status(500).json({ error: err });
		});
};
