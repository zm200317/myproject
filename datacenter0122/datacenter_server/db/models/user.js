/*
用来定义用户登录UserModel模型
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var userSchema = new Schema({
    useremail:{type:String},
    username:{type:String},//用户名
    password:{type:String,require:true},//密码
    checkCode:{type:String,require:true},//密码
    type:{type:String,default:'内部员工'},//用户类型：VIP/普通用户/内部员工/管理员
    headerImg:{type:String},//头像
    registerData:{type:String},//注册时间
    lastLoginData:{type:String,default:'未登录'},//最后登录时间
    certification:{type:String,default:'未认证'},//认证情况：未认证/基本信息认证/实名认证
    accountStatus:{type:String,default:'未激活'},//账号状态：未激活/已激活/停用
    satelliteCollection:[]
})
//定义模型
var UserModel = mongoose.model('user',userSchema)//用户集合名称是users
module.exports = UserModel
