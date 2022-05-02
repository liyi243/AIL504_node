/*
 * @Author: your name
 * @Date: 2022-04-30 09:22:25
 * @LastEditTime: 2022-05-01 15:21:13
 * @LastEditors: Please set LastEditors
 * @Description: 用户相关路由
 * @FilePath: /Node_code/router/user.js
 */

const express = require('express')
//导入数据验证中间件
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const expressJoi = require('@escook/express-joi')
//导入要验证的规则对象
const { reg_schema } = require('../schema/user')


const router = express.Router()
const user_handler = require('../router_handler/user')

// 路由中间件---注册
router.post('/reguser',expressJoi( reg_schema ),user_handler.regUser)
// router.post('/reguser', user_handler.regUser)
// 路由中间件---登陆
router.post('/login',user_handler.login)


//共享接口
module.exports = router
