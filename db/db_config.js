/*
 * @Author: liyunzhi
 * @Date: 2022-04-29 18:52:32
 * @LastEditTime: 2022-05-01 14:48:09
 * @LastEditors: Please set LastEditors
 * @Description: 用于连接数据库
 */
const mysql = require('mysql')
/**
 * @description: 连接阿里云上的mysql数据库
 * @param {*} :ip 账户名 密码 数据库
 * @return {*}：db 
 */
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    port:'3306',
    password:'******',
    database:'AIL504'
    // aliyun
    // host:'47.98.177.122',
    // user:'root',
    // port:'3305',
    // password:'yttech123456',
    // database:'sql_node'
})


// db.query('select 1', (err, results) => {    
//     //工作期间报错    
//     if(err) return console.log(err.message)
//     console.log(results);
// })  
//向外共享数据库
module.exports = {db}
