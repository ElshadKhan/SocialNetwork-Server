const Router = require('express')
const router = new Router()
const PostController = require('../controller/postController.js')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', PostController.createPost)
router.get('/findAllPosts', PostController.getAllPosts)
router.get('/findAllUserPosts/:id', PostController.getAllUserPosts)

module.exports = router 