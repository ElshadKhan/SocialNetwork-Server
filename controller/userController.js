const ApiError = require('../error/ApiError.js')
const { User, Post } = require("../models/models.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, username, role) => {
    return jwt.sign(
        {id, email, role, username}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}
 
class UserController {
    async registration(req, res, next) {
            const {email, username, name, password, role} = req.body
            if ( !email || !password || !username) {
                return next(ApiError.badRequest('Некорректный email или password'))
            } 
            const candidate1 = await User.findOne({where: {email}})
            if (candidate1) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const candidate2 = await User.findOne({where: {username}})
            if (candidate2) {
                return next(ApiError.badRequest('Пользователь с таким login уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, username, name, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.username, user.role)
                return res.json({token})   
    }
    async login(req, res, next) {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Указан не верный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.username, user.role, user.password)
                return res.json({token})   
    }
    async check(req, res) {
             const token = generateJwt(req.user.email, req.user.password, req.user.role)
                 return res.json({token})  
    }
    async deleteUser(req, res) {
        const {id} = req.params
        const user = await User.destroy({where: {id}})
        return res.json('User deleted')  
    }  
    async updateUserLogin(req, res, next) {
            const {id} = req.params
            const {username} = req.body 
            const candidate = await User.findOne({where: {username}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким login уже существует'))
            }
            const user = await User.update({username: username}, {where: {id}}) 
            const token = generateJwt(user.id, user.email, user.username, user.role)
            return res.json({token}) 
    }  
}

module.exports = new UserController();