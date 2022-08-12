const ApiError = require('../error/ApiError.js')
const uuid = require('uuid')
const path = require('path')
const { User, Post } = require('../models/models')
const sequelize = require('../db.js');

class PostController {
    async createPost (req, res, next) {
      try { 
        const { content, userId } = req.body
        const { picture } = req.files 
        let fileName = uuid.v4() + ".jpg"   
        picture.mv(path.resolve(__dirname, "..", 'static', fileName))
        // const user = User.findByPk(userId);
        const username = await sequelize.query(
        `SELECT username FROM users WHERE id = ${userId}`);
        let username1 = username[0][0]
        username1.content = content;
        username1.picture = fileName;
        console.log(username1)
        const post = await Post.create({content, picture: fileName, userId, userlogin: username1.username});
        return res.json(username1) 
      } catch (error) { 
          next(ApiError.badRequest(error.massage))
      }
        
    }
    // async updatePost (req, res) {

    // }
    // async deletePost (req, res) {

    // }
    async getAllPosts (req, res) {
        const posts = await Post.findAll()
        return res.json(posts)
    } 
    // async getUserPosts (req, res) {

    // }
    // async getOnePost (req, res) {

    // }
}

module.exports = new PostController()