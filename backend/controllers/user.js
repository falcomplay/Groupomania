//Imports
const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");
const fs = require("fs");

exports.findOneProfile = (req, res, next) => {
	// Getting auth header
	const headerAuth = req.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);

	if (userId < 0) {
		res.status(400).json({ error: "mauvais token" });
	}

	models.User.findOne({
		attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		where: { id: userId },
	})
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.findFriendProfile = (req, res, next) => {
	models.User.findOne({
		attributes: ["id", "firstname", "lastname", "username", "bio", "profilePhoto"],
		where: { id: req.params.id },
	})
		.then((user) => {
			if (user) {
				res.status(201).json(user);
			} else {
				res.status(404).json({ error: "Utilisateur introuvable !" });
			}
		})
		.catch(function (err) {
			res.status(500).json({ error: "Utilisateur impossible à trouver dans la BDD !" });
		});
};

exports.findAllProfile = (req, res) => {
	models.User.findAll({
		attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] },
	})
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json({ error }));
};

exports.updateUserProfile = async function (req, res) {
	// Getting auth header
	const headerAuth = req.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);

	if (userId < 0) {
		res.status(400).json({ error: "mauvais token" });
	}

	// Params
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const username = req.body.username;
	const bio = req.body.bio;

	await models.User.findOne({
		attributes: ["id", "bio", "firstname", "lastname", "profilePhoto"],
		where: { id: userId },
	})
		.then(async function (userFound) {
			if (userFound) {
				await userFound
					.update({
						firstname: firstname ? firstname : userFound.firstname,
						lastname: lastname ? lastname : userFound.lastname,
						username: username ? username : userFound.username,
						bio: bio ? bio : userFound.bio,
						profilePhoto: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : userFound.profilePhoto,
					})
					.then(function () {
						res.status(200).json({ message: "Utilisateur mis à jour !" });
					})
					.catch((error) => {
						res.status(500).json({ error });
					});
			} else {
				res.status(404).json({ error: "Utilisateur introuvable !" });
			}
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

exports.deleteOneUser = async (req, res) => {
	// Getting auth header
	const headerAuth = req.headers["authorization"];
	const userId = jwtUtils.getUserId(headerAuth);
	const isAdmin = jwtUtils.getAdmin(headerAuth);

	try {
		const user = await models.User.findOne({ where: { id: req.params.userId } });

		if (userId === user.id || isAdmin === true) {
			if (user.profilePhoto !== null) {
				const filename = user.profilePhoto.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					user.destroy({
						where: { id: req.params.userId },
					});
					return res.json({ message: "Utilisateur supprimé" });
				});
			} else {
				user.destroy({
					where: { id: req.params.userId },
				});
				return res.json({ message: "Utilisateur supprimé" });
			}
		} else {
			res.status(404).json({ error: "Problème authentification" });
		}
	} catch (err) {
		return res.status(500).json({ err });
	}
};
