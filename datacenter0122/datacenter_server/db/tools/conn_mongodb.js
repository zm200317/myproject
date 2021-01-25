/*
定义一个模块，用来连接MongoDB数据库
 */
//1.引入mongoose
var mongoose = require('mongoose')
//2.连接指定数据库（URL只有数据库是变化的）
mongoose.connect("mongodb://localhost/datacenter_db",{userNewUrlParser:true,useUnifiedTopology:true})
//3.获取连接对象
var conn = mongoose.connection
//4.绑定连接完成的监听（用来提示连接成功）（监听函数conn.on=conn.once)
conn.on('open',function () {
    console.log('数据库连接成功~~~~~~')
})
//断开数据库连接
// mongoose.disconnect()
