require('./tools/conn_mongodb')//连接数MongoDB据库
const md5 = require('blueimp-md5')//md5加密函数
var RemoteModel = require('./models/satellite_data')//创建模型对象
var UserModel = require('./models/user')//创建用户登录模型对象

//向数据库中添加遥感数据信息（集合为remote_data)
/*RemoteModel.create({
    name:'123',
    path:'D:/',
    size:20
},function (err) {
    if(!err){
        console.log('成功')
    }else{
        console.log('失败')
    }
})*/
//查看所有遥感数据
RemoteModel.find({},function (err,docs) {
    if(!err){
        console.log(docs)
    }
})
//创建用户登录实例并存储到数据库（集合为user）
/*const userModel = new UserModel({
    username:'Tom',password:md5('123'),type:'VIP'
})
userModel.save(function (err,user) {
    console.log('save()',err,user)
})*/
//查看所有用户信息
UserModel.find({},function (err,docs) {
    if(!err){
        console.log(docs)
    }
})
