/*
 * @Author: your name
 * @Date: 2022-04-30 11:02:42
 * @LastEditTime: 2022-05-05 09:18:15
 * @LastEditors: liyz243 liyz243@163.com
 * @Description: 表单验证
 * @FilePath: /Node_code/schema/user.js
 */

const joi = require('joi')

/**
 * 定义用户名规则
 * 必须是字符串0-9，a-z，A-Z，长度在3到10之间，必选
 * 自定义验证失败错误信息
 */
const userName = joi.string().alphanum().min(3).max(20).required().error(new Error('用户名格式不正确'))
/**
 * 密码验证
 * 必须是6-12位的字符串类型
 * 自定义验证失败错误信息
 */
const userPassword = joi.string().pattern(/^[\S]{6,12}$/).required().error(new Error('密码格式不正确'))

// 手机号验证待优化
const userPhone = joi.string().alphanum().required().error(new Error('手机号格式不正确'))
const userEmail = joi.string().email().required().error(new Error('邮箱格式不正确'))

//导出--注册登陆表单验证
exports.reg_schema = {
    //校验body数据
    body:{
        userName,
        userPassword,
        userPhone,
        userEmail,
    }
}