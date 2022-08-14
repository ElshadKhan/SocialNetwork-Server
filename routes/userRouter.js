const Router = require('express')
const router = new Router()
const UserController = require('../controller/userController.js')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/regist', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware ,UserController.check)
router.delete('/delete/:id', UserController.deleteUser)
router.put('/update/:id', UserController.updateUserLogin)
 
module.exports = router