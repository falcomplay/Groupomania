"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.User.hasMany(models.Comment);

			models.Post.belongsTo(models.User, {
				onDelete: "cascade",
				foreignKey: {
					allowNull: false,
				},
			});
		}
	}
	Post.init(
		{
			title: {
				type: DataTypes.STRING,
				validate: {
					min: 2,
					notEmpty: true,
				},
			},
			content: {
				type: DataTypes.STRING,
				validate: {
					min: 4,
					notEmpty: true,
				},
			},
			attachment: DataTypes.STRING,
			userName: {
				type: DataTypes.STRING,
				references: {
					model: "User",
					key: "username",
				},
			},
		},
		{
			sequelize,
			modelName: "Post",
			paranoid: true,
		}
	);
	return Post;
};
