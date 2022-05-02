/*
 * @Author: liyunzhi
 * @Date: 2022-04-29 19:09:25
 * @Description: 文件打包与执行入口文件
 */

/**
 * 导包
 * express/cors跨域/user路由
 */
const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')

const config = require('./router_handler/config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
//表单解析
const formidable = require('express-formidable')

const bodyParser = require('body-parser')



//app实例
const app = express()
/**
 * 配置--中间件
 * 跨域、解析表单
 */


app.use(cors())
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     //方便返回json
//     res.header("Content-Type", "application/json;charset=utf-8");
//     if (req.method == 'OPTIONS') {
//         //让options请求快速返回
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// })


//表单解析
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }))
// app.use(express.urlencoded({ extended: false }))
// app.use(formidable())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }))


// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))



//注册一个数据响应的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})


app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
/**
 * 注册--注册中间件
 */
app.use('/api',userRouter)



/**
 * 启动express服务器
 */
app.listen(4000,()=>{
    console.log('api server running at http://127.0.0.1:4000')
})
