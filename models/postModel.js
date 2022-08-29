const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const Post = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING },
  picture: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  Post,
};
