//Imports
const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");

//routes
exports.createComment = async (req, res, next) => {
	const headerAuth = await req.headers["authorization"];
	const userId = await jwtUtils.getUserId(headerAuth);

	const postId = req.params.id;

	if (postId <= 0) {
		return res.status(400).json({ error: "Paramètre invalide" });
	}

	const comment = req.body.comment;

	await models.User.findOne({
		where: { id: userId },
	})
		.then(async function (user) {
			if (user) {
				let newComment = await models.Comment.create({
					userId: userId,
					postId: req.params.postId,
					userName: user.username,
					comment: comment,
				});
				return res.status(201).json({ newComment: newComment });
			} else {
				return res.status(404).json({ error: "Utilisateur introuvable" });
			}
		})
		.catch(function (error) {
			return res.status(500).json({ error });
		});
};

exports.findAllComments = (req, res) => {
	models.Comment.findAll({
		attributes: ["PostId"],
	})
		.then(function (comments) {
			if (comments) {
				res.status(200).json({ comments: comments });
			} else {
				res.status(404).json({ error: "no post found" });
			}
		})
		.catch(function (err) {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.deleteOneComment = async (req, res) => {
	// Getting auth header
	const headerAuth = req.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	const isAdmin = jwtUtils.getAdmin(headerAuth);

	await models.User.findOne({
		where: { id: userId },
	})
		.then(async () => {
			try {
				const comment = await models.Comment.findOne({ where: { id: req.params.id } });
				if (userId == comment.userId || isAdmin === true) {
					await comment.destroy();
					return res.json({ message: "comment supprimé" });
				} else {
					res.status(404).json({ error: "Problème authentification" });
				}
			} catch (err) {
				return res.status(500).json({ err: "Vous ne pouvez pas faire ça" });
			}
		})
		.catch(function (err) {
			return res.status(500).json({ error: err });
		});
};
