/*
 * @Author: your name
 * @Date: 2022-04-30 09:22:33
 * @LastEditTime: 2022-05-05 09:02:59
 * @LastEditors: liyz243 liyz243@163.com
 * @Description: user路由对应处理函数
 * @FilePath: /Node_code/router_handler/user.js
 */

/**
 * 导包
 */
const { db }= require('../db/db_config')
//加密包
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const config = require('./config')
/**
 * 注册处理函数
 */
exports.regUser = (req,res)=>{
    //接收一下body里填的用户信息
    const userinfo = req.body
    //检测body表单数据是否合法
    //username和password来自填写表单的键
    
    if(!userinfo.userName || !userinfo.userPassword || !userinfo.userPhone || !userinfo.userEmail) res.cc('用户名/密码/手机号/邮箱不能为空')
    //检测是否被占用
    db.query(`select * from user where user_name = ?`,userinfo.userName,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length>0) return res.cc('用户名被占用,请更换用户名')
        // TODO:执行注册成功对应的操作
        //密码加密存数据库
        userinfo.userPassword = bcrypt.hashSync(userinfo.userPassword, 10)
        db.query(`insert into user set ?`,{ 
            user_name:userinfo.userName, 
            user_password:userinfo.userPassword, 
            user_phone:userinfo.userPhone,
            user_email:userinfo.userEmail
        },
            (err,result)=>{
            if(err) return res.cc(err)
            if (result.affectedRows!==1) return res.cc('注册失败')
            res.cc('注册成功', true)
        })
        
    })
}
/**
 * 登录处理函数
 */
exports.login = (req,res)=>{
    //接收表单
    const userinfo = req.body
    db.query(`select * from user where user_name = ?`,[userinfo.userName],(err,result)=>{
        //sql执行失败
        if(err) return res.cc(err)
        //查询到不止一条结果，则登陆失败
        if(result.length !== 1) return res.cc('登陆失败')
        // TODO:查询到数据库有这个用户，继续...
        //对比一下数据库的密码和用户输入的密码
        const compareResult = bcrypt.compareSync(userinfo.userPassword,result[0].user_password)
        if(!compareResult) return res.cc('密码错误,请重新输入')
        //res.cc('登录成功')

        //TODO:登陆成功,Token还未写
        //剔除密码和手机号邮箱号
        const user = { ...result[0], user_Password: '', user_phone: '',user_email:''}
        // let secretOrPrivateKey = "miyao"
        let token = jwt.sign(user,config.jwtSecretKey,{
            //有效期1小时
            expiresIn:60*60*1,
        })
        res.cc({
            message:'登录成功',
            token: 'Bearer ' + token, 
        }, true)

    })

}