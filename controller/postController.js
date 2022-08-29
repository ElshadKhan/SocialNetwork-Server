const ApiError = require("../error/ApiError.js");
const uuid = require("uuid");
const path = require("path");
const { User } = require("../models/models");
const { Post } = require("../models/models");

class PostController {
  async createPost(req, res, next) {
    try {
      const { content, user_id } = req.body;
      const { picture } = req.files;
      let fileName = uuid.v4() + ".jpg";
      picture.mv(path.resolve(__dirname, "..", "static", fileName));
      const post = await Post.create({ content, picture: fileName, user_id });
      return res.json(post);
    } catch (error) {
      next(ApiError.badRequest(error.massage));
    }
  }
  async getAllPosts(req, res, next) {
    try {
      const posts = await Post.findAll({ include: [User] });
      return res.json(posts);
    } catch (error) {
      next(ApiError.badRequest(error.massage));
    }
  }
  async getAllUserPosts(req, res, next) {
    try {
      const { id } = req.params;
      const posts = await Post.findAll({
        include: [User],
        where: { user_id: id },
      });
      return res.json(posts);
    } catch (error) {
      next(ApiError.badRequest(error.massage));
    }
  }
}

module.exports = new PostController();
