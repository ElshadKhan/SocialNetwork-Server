const ApiError = require('../error/ApiError.js')
const uuid = require('uuid')
const path = require('path')
const { Post } = require('../models/models')
const sequelize = require('../db.js');

class PostController {
    async createPost (req, res, next) {
      try { 
        const { content, userId } = req.body
        const { picture } = req.files 
        let fileName = uuid.v4() + ".jpg"   
        picture.mv(path.resolve(__dirname, "..", 'static', fileName))
        const username = await sequelize.query(
        `SELECT username FROM users WHERE id = ${userId}`);
        let username1 = username[0][0]
        username1.content = content;
        username1.picture = fileName;
        const post = await Post.create({content, picture: fileName, userId, userlogin: username1.username});
        return res.json(username1) 
      } catch (error) { 
          next(ApiError.badRequest(error.massage))
      }
    }
    async getAllPosts (req, res) {
        const posts = await Post.findAll()
        return res.json(posts)
    } 
    async getAllUserPosts (req, res) {
        const {id} = req.params
        const posts = await Post.findAll({where: {userId: id}})
        return res.json(posts)  
    }

}

module.exports = new PostController()