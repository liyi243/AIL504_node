/*
 * @Author: your name
 * @Date: 2022-04-30 09:32:18
 * @LastEditTime: 2022-04-30 09:32:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Node_code/db/db_test.js
 */

const { db } = require('./db_config')

const userstr = {
    username: 'admin', password: 'admin'
}

// const sqlStr = 'INSERT INTO userinfo SET ?'//？是占位符
// db.query(sqlStr,userstr,(err,results)=>{
//     if(err) return console.log(err.message)
//     if(results.affectedRows===1){
//         console.log('插入成功')
//     }
// })

// const strsql = `insert into userinfo set ?`
// db.query(strsql,userstr,(err,result)=>{
//     if(err) return console.log(err);
//     if (result.affectedRows !== 1)return console.log('插入失败')
//     console.log('插入成功');
// })
db.query('select * from userinfo', (err, result) => {
    if (err) return console.log(err)
    console.log(result)
})
