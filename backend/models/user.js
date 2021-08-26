"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.User.hasMany(models.Post);
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: {
						msg: "Email address must be valid.",
					},
					notEmpty: true,
				},
				unique: {
					msg: "already exists",
				},
			},
			username: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [4, 13],
						msg: "Le pseudo doit être compris entre 4 et 13 charactères.",
					},
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			bio: DataTypes.STRING,
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			profilePhoto: DataTypes.STRING,
			isAdmin: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
