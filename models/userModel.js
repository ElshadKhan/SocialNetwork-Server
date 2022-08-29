const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");
const Post = require("./postModel");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
};
