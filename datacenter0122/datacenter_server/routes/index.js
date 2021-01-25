var express = require('express');
var router = express.Router();
const ajax = require('../api/ajax')
require('../db/tools/conn_mongodb')//连接数MongoDB据库
const UserModel = require('../db/models/user')
const SatelliteModel = require('../db/models/satellite_data')
const SatelliteSizeModel = require('../db/models/satellite_size')
const SatelliteL0Model = require('../db/models/satellite_data_L0')
var svgCaptcha = require('svg-captcha')
const md5 = require('blueimp-md5')
const filter = {password:0,_v:0}//指定过滤的属性
var fs = require('fs')
var path = require('path');
var xml2js = require('xml2js');
var formidable = require('formidable');
var formatDate = require('../formatDate.js')//格式化日期

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//获取卫星数据的大小
router.get('/dataSize',function (req,res) {
    const SatelliteID = req.query.SatelliteID

    SatelliteSizeModel.find({SatelliteID:SatelliteID},function (err,satellites) {
        var size = 0
        satellites.forEach(function(satellite){
            size+=satellite.Size
        })
        res.send({code:0,data:size.toFixed(2)})
    })
})

//获取ZY1E L0 级卫星数据总条数
router.get('/totalnumbL0',function (req,res) {
    const SatelliteID = req.query.SatelliteID
    SatelliteL0Model.find({SatelliteID:SatelliteID},function (err,satellites) {
        var count = satellites.length
        res.send({code:0,data:count})
    })
})
//获取ZY1E L0 级卫星数据信息
router.get('/zy1eL0',function (req,res) {
    const SatelliteID = req.query.SatelliteID
    const currentPage = req.query.currentPage
    const pageSize = req.query.pagesize
    SatelliteL0Model.find({SatelliteID:SatelliteID},function (err,satellites) {
        res.send({code:0,data:satellites})
        console.log('currentPage=',currentPage)
    }).limit(10).skip(10*(currentPage-1))
})

//下载卫星数据：方法一
router.get('/download',function(req, res, next){
    var currDir = path.normalize(req.query.dir),
        fileName = req.query.name,
        currFile = path.join(currDir,fileName)

    var newFile = fs.createReadStream(currFile);
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-Disposition': 'attachment; filename=NW.js.docx'
    });
    newFile.pipe(res);
});
//下载文件：方法二
/*router.get('/download',function(req, res, next){
    var currDir = path.normalize(req.query.dir),
        fileName = req.query.name,
        currFile = path.join(currDir,fileName),
        fReadStream;

    fs.exists(currFile,function(exist) {
        if(exist){
            res.set({
                "Content-type":"application/octet-stream",
                "Content-Disposition":"attachment;filename="+encodeURI(fileName)
            });
            fReadStream = fs.createReadStream(currFile);
            fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
            fReadStream.on("end",function () {
                res.end();
                // console.log(res)
            });
        }else{
            res.set("Content-type","text/html");
            res.send("file not exist!");
            res.end();
        }
    });
});*/
//退出页面后需要删除卫星缩略图图片
router.get('/delThumb',function (req,res) {
    var filePath = path.resolve('D:\\VueWorkSpace\\datacenter0122\\data-center-client\\public');//将一个路径或路径片段解析为绝对路径
    //读取public文件夹
    var files = fs.readdirSync(filePath)
    //遍历public文件夹下的文件列表，如果是图片就删除
    files.forEach(function(filename) {
        // console.log('filename=',filename)
        var curPath = path.join(filePath,filename);
        // console.log('curPath=',curPath)
        if(filename.indexOf(".jpg") != -1)
        {
            fs.unlinkSync(curPath)
            // console.log('已删除')
        }
    })
    res.send({code:0,data:'删除成功'})
})
//获取卫星信息
router.post('/satellites',function (req,res) {
    //前端代码public文件夹目录
    //必须要把拇指图片放到public文件夹下，否则图片无法显示
    // 显示出图片之后，为了节省内容，还需把图片删除
    const { satelliteID, select, value, currentPage, pagesize }=req.body
    var filePath = path.resolve('D:\\VueWorkSpace\\datacenter0122\\data-center-client\\public');//将一个路径或路径片段解析为绝对路径
    //读取public文件夹
    var files = fs.readdirSync(filePath)
    //遍历public文件夹下的文件列表，如果是图片就删除
    files.forEach(function(filename) {
        // console.log('filename=',filename)
        var curPath = path.join(filePath,filename);
        // console.log('curPath=',curPath)
        if(filename.indexOf(".jpg") != -1)
        {
            fs.unlinkSync(curPath)
            // console.log('已删除')
        }
    })
    if(select==='ProductID'){
        console.log('`${select}`=',`${select}`)
        var satellitesInfo={}
        SatelliteModel.count({'SatelliteID':satelliteID,'ProductID':value},(err, count) => {
            satellitesInfo.count=count
            console.log('count=',satellitesInfo.count)
            SatelliteModel.find({'SatelliteID':satelliteID,ProductID:value},function (err,satellites) {
                //根据页码查找10条信息，将找到的10条信息对应的图片复制到前端代码的public文件夹下
                satellites.forEach((item)=>{
                    var publicPath = path.join(filePath,item.ThumbFile);
                    fs.writeFileSync( publicPath, fs.readFileSync(item.ThumbPath))
                })
                satellitesInfo.satellites=satellites
                res.send({code:0,data:satellitesInfo})
            }).limit(10).skip(10*(currentPage-1))
        })
    }
    else if(select==='SceneID'){
        var satellitesInfo={}
        SatelliteModel.count({SatelliteID:satelliteID,SceneID:value},(err, count) => {
            satellitesInfo.count=count
            SatelliteModel.find({SatelliteID:satelliteID,SceneID:value},function (err,satellites) {
                satellites.forEach((item)=>{
                    var publicPath = path.join(filePath,item.ThumbFile);
                    fs.writeFileSync( publicPath, fs.readFileSync(item.ThumbPath))
                })
                satellitesInfo.satellites=satellites
                res.send({code:0,data:satellitesInfo})
            }).limit(10).skip(10*(currentPage-1))
        })
    }
    else if(select==='SceneRow'){
        var satellitesInfo={}
        SatelliteModel.count({SatelliteID:satelliteID,SceneRow:value},(err, count) => {
            satellitesInfo.count=count
            SatelliteModel.find({SatelliteID:satelliteID,SceneRow:value},function (err,satellites) {
                satellites.forEach((item)=>{
                    var publicPath = path.join(filePath,item.ThumbFile);
                    fs.writeFileSync( publicPath, fs.readFileSync(item.ThumbPath))
                })
                satellitesInfo.satellites=satellites
                res.send({code:0,data:satellitesInfo})
            }).limit(10).skip(10*(currentPage-1))
        })
    }
    else if(select==='ProduceTime'){
        var satellitesInfo={}
        var reg = new RegExp(value, 'i');//忽略大小写
        SatelliteModel.count({SatelliteID:satelliteID,ProduceTime:reg},(err, count) => {
            satellitesInfo.count=count
            SatelliteModel.find({SatelliteID:satelliteID,ProduceTime:reg},function (err,satellites) {
                satellites.forEach((item)=>{
                    var publicPath = path.join(filePath,item.ThumbFile);
                    fs.writeFileSync( publicPath, fs.readFileSync(item.ThumbPath))
                })
                satellitesInfo.satellites=satellites
                res.send({code:0,data:satellitesInfo})
                console.log(satellitesInfo.count)
            }).limit(10).skip(10*(currentPage-1))
        })
    }
    else if(select==='CloudPercent'){
        var satellitesInfo={}
        SatelliteModel.count({SatelliteID:satelliteID,CloudPercent:{$lte:Number(value)}},(err, count) => {
            satellitesInfo.count=count
            SatelliteModel.find({'SatelliteID':satelliteID,CloudPercent:{$lte:value}},function (err,satellites) {
                satellites.forEach((item)=>{
                    var publicPath = path.join(filePath,item.ThumbFile);
                    fs.writeFileSync( publicPath, fs.readFileSync(item.ThumbPath))
                })
                satellitesInfo.satellites=satellites
                res.send({code:0,data:satellitesInfo})
            }).limit(10).skip(10*(currentPage-1))
        })
    }
    else if(select==='CenterLatitude'){
        var satellitesInfo={}
        SatelliteModel.count({SatelliteID:satelliteID,CenterLatitude:value},(err, count) => {
            satellitesInfo.count=count
            SatelliteModel.find({SatelliteID:satelliteID,CenterLatitude:value},function (err,satellites) {
                satellites.forEach((item)=>{
                    var publicPath = path.join(filePath,item.ThumbFile);
                    fs.writeFileSync( publicPath, fs.readFileSync(item.ThumbPath))
                })
                satellitesInfo.satellites=satellites
                res.send({code:0,data:satellitesInfo})
            }).limit(10).skip(10*(currentPage-1))
        })
    }
    else if(select==='CenterLongitude'){
        var satellitesInfo={}
        SatelliteModel.count({SatelliteID:satelliteID,CenterLongitude:value},(err, count) => {
            satellitesInfo.count=count
            SatelliteModel.find({SatelliteID:satelliteID,CenterLongitude:value},function (err,satellites) {
                satellites.forEach((item)=>{
                    var publicPath = path.join(filePath,item.ThumbFile);
                    fs.writeFileSync( publicPath, fs.readFileSync(item.ThumbPath))
                })
                satellitesInfo.satellites=satellites
                res.send({code:0,data:satellitesInfo})
            }).limit(10).skip(10*(currentPage-1))
        })
    }
    else{
        var satellitesInfo={}
        console.log('`${select}`=',`${select}`)
        SatelliteModel.count({'SatelliteID':satelliteID},(err, count) => {
            satellitesInfo.count=count
            console.log('select=',select)
            SatelliteModel.find({SatelliteID:satelliteID},function (err,satellites) {
                //根据页码查找10条信息，将找到的10条信息对应的图片复制到前端代码的public文件夹下
                satellites.forEach((item)=>{
                    var publicPath = path.join(filePath,item.ThumbFile);
                    fs.writeFileSync( publicPath, fs.readFileSync(item.ThumbPath))
                })
                satellitesInfo.satellites=satellites
                res.send({code:0,data:satellitesInfo})
                // console.log('count=',satellitesInfo.count)
            }).limit(10).skip(10*(currentPage-1))
        })

    }
})
//收藏数据
router.post('/collect',function (req,res) {
    const{_id,satelliteCollection} = req.body
    // console.log(req.body)

    UserModel.findByIdAndUpdate({_id},{
        '$push': {satelliteCollection:satelliteCollection}
    },function (err,user) {
        //如果user有值（已存在）
        console.log(user)
        if(user){
            console.log(user.satelliteCollection.length)
            res.send({code:0,msg:'收藏成功！'})
        }else{

        }
        /*let doc = await db.comment.findByIdAndUpdate(
            { _id: ctx.request.body._id },
            { $push: { reply: addInfo } },
            { new: true })
        if (doc._id) {
            ctx.body = doc
        }*/
    })
})
//我的收藏
router.get('/mycollect',function (req,res) {
    var _id = req.query.userID
    // console.log(req.body)
    //判断用户是否已经存在，如果存在返回提示错误的信息，如果不存在就保存
    //查询（根据username)
    UserModel.findOne({_id},function (err,user) {
        //如果user有值（已存在）
        // console.log(user)
        if(user){
            console.log(user.satelliteCollection)
            res.send({code:0,data:user.satelliteCollection})
        }else{

        }
    })
})
//我的收藏里面的删除按钮
router.post('/delete',function (req,res) {//async (ctx) =>
    console.log(req.body)
    var userID = req.body._id
    var satelliteInfo = req.body.satelliteInfo
    // console.log(userID,satelliteInfo)
    //判断用户是否已经存在，如果存在返回提示错误的信息，如果不存在就保存
    //查询（根据username)
    UserModel.findByIdAndUpdate({_id:userID}, {
        '$pull': {satelliteCollection:satelliteInfo}
    },function (err,user) {
        if(!err){
            // console.log('user.satelliteCollection=',user.satelliteCollection)
            res.send({code:0,data:user.satelliteCollection})
        }else{
            console.log('删除失败')
        }
    })

})
//获取XML详细信息
router.get('/detail',function (req,res) {
    var path = req.query.XMLName
    console.log('path=',path)
    var data = fs.readFileSync(path);
    // console.log('data=',data)
    // req.session.hello ='helloworld'
    // res.cookie('hello','helloworld')
    var parser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true,trim:true});
    parser.parseString(data,function (err,result) {
        // console.log(req.cookies.hello)
        res.send(result.ProductMetaData)
    });
})

//发送邮箱验证码
router.get('/getMailCode',function (req,res) {
    const useremail=req.query.useremail
    console.log(useremail)
    const NodeEmail = require('nodemailer');
    var mailSend = NodeEmail.createTransport({
        service: 'qq',
        auth: {
            user: '1312721271@qq.com',//发送者邮箱
            pass: 'rzfgqjmqpbwyffia' //授权码,通过QQ获取
        }
    });
// 生成验证码
    let code = Math.random().toString().slice(-6);
    if(useremail){
        UserModel.findOne({useremail},function (err,user) {
            if(user){
                res.send({err:-1,msg:'该邮箱已注册！'})
            }
            else{
                var mailOptions = {
                    from: '1312721271@qq.com', // 发送者
                    to: useremail, // 接受者,可以同时发送多个,以逗号隔开
                    subject: '欢迎注册遥感卫星数据管理平台', // 标题
                    // text: 'Hello world', // 文本
                    html: `<div><span>您的验证码为验证码为：</span><b>${code}</b></div>`
                };
                // codes[mail]=code
                console.log(code)
                mailSend.sendMail(mailOptions).then(()=>{
                    res.send({err:0,data:code})
                }).catch((err)=>{
                    console.log('验证码发送失败')
                    res.send({err:-1,msg:'验证码发送失败'})
                })
            }
        })
        // let code = parseInt(Math.random()*10000)
    }else{
        console.log('参数错误')
        res.send({err:-1,msg:'邮箱不能为空'})
    }
})
//用户注册的路由
router.post('/register',function (req,res) {
 const{username,useremail,password,type} = req.body
  // console.log(req.body)
  //判断用户是否已经存在，如果存在返回提示错误的信息，如果不存在就保存
  //查询（根据username)
  UserModel.findOne({username,useremail},function (err,user) {
    //如果user有值（已存在）
    // console.log(user)
    if(user){
      res.send({code:1,msg:'此用户已存在！'})
    }else{//user没有值（不存在）
        // var registerData = new Data
        var date = new Date()
        var registerData = formatDate.dateFormt('yyyy-MM-dd HH:mm:ss',date)
      //保存到数据库
      new UserModel({
          username,
          useremail,
          type,
          password:md5(password),
          registerData
      }).save(function (err,user) {
        //生成一个cookie（userid:user._id),并交给浏览器
        res.cookie('userid',user._id,{maxAge:1000*60*60*24})//生命周期是一天24小时
        // 返回包含user的json数据
        const data = {username,useremail,type,_id:user._id}//响应数据中不要携带password
        res.send({code:0,data})
      })
    }
  })
})

//用户登录的路由
router.post('/login',function (req,res) {//lastLoginData
  const {username,useremail,password}=req.body
    var date = new Date()
    var lastLoginData = formatDate.dateFormt('yyyy-MM-dd HH:mm:ss',date)
  //根据username和password查询数据库users,如果没有，返回提示错误的信息，如果有返回登录成功的信息（包含user)
    UserModel.findOneAndUpdate({username,useremail,password:md5(password)},
        {$set:{lastLoginData:lastLoginData}}, {new:true},
        function (err,user) {
        if(user){
            res.send({code:0,data:user})
        }else{
            res.send({code:1,msg:'登录失败'})
        }
    })
})

//用户重置密码
router.post('/reset_pass',function (req,res) {
    const {useremail,password}=req.body
    //根据useremail查询数据库users,如果没有，返回提示错误的信息，如果有则修改密码
    UserModel.updateOne({useremail},{$set:{password:md5(password)}},function(err, user) {
        if (user) {//成功
            //修改密码
            // console.log(user)
            res.send({code: 0, data: user})
        } else {//失败
            res.send({code: 1, msg: '此邮箱不存在！'})
        }
    })
})

/*
一次性图形验证码
 */
router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create({
        ignoreChars: '0o1l',
        noise: 2,
        height:50,
        width:100,
        color: false
    });
    req.session.captcha = captcha.text.toLowerCase();
    // res.cookie('captcha',req.session.captcha)
    var Captcha =captcha.text.toLowerCase();
    // req.session.captcha = captcha.text.toLowerCase();
    res.cookie('captcha',Captcha,{ httpOnly: false });
    // res.captcha=Captcha
    /*if(!window.localStorage){
         console.log("浏览器支持localstorage");
    }else{
        var storage=window.localStorage;
        storage["captcha"]=Captcha;
        // storage.b=1;
        // storage.setItem("captcha",Captcha);
        /!*分割线*!/
        console.log(storage.captcha);
    }*/
    res.type('svg');
    console.log('captcha=',req.session.captcha)
    // console.log('session=',sessionStorage)
    res.send(captcha.data)
});

//获取用户信息，根据session中的userid查询对应的user
router.post('/userinfo',function (req,res) {
    //取出userid
    const {userid} = req.body
    //查询
    UserModel.findOne({_id:userid},filter,function (err,user) {
        //如果没有，返回错误提示
        // console.log('userid=',userid)
        if(!user){
            //清除浏览器保存的userid的cookie
            delete req.session.userid
            res.send({code:1,msg:'请先登录'})
        }else{
            //如果有，返回user
            // console.log(user)
            res.send({code:0,data:user})

        }
    })
})

//登出
router.get('/logout', function (req, res) {
    // 清除浏览器保存的userid的cookie
    console.log(req.session)
    delete req.session.userid
    // 返回数据
    console.log(req.session)
    res.send({code: 0})
})
//上传头像jpg格式
router.get('/uploadHeader', function (req, res) {
    const srcUrl=req.query.srcUrl
    const userId=req.query.userId
    // var filePath = path.resolve('D:\\VueWorkSpace\\datacenter0107\\data-center-client\\public');//将一个路径或路径片段解析为绝对路径

    UserModel.findByIdAndUpdate({_id:userId}, {
        '$set': {headerImg: srcUrl}
    },function (err,user) {
        if(!err){
            // console.log('user.headerImg=',user.headerImg)
            /*var publicPath = path.join(filePath,srcUrl);
            fs.writeFileSync( publicPath, fs.readFileSync(srcUrl))*/
            res.send({code:0,data:user})
        }else{
            console.log('失败')
        }
    })
})
//上传个人头像图片
router.post("/uploadImage", function (req, res) {
    let datas = {};
    datas.code = '0';
    datas.message = '上传图片成功';
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    let PUBLIC_PATH = '../public';
    let filedr = "\\upload";
    form.uploadDir = path.join(__dirname + filedr);
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    // console.log("form.uploadDir=",form.uploadDir)
    //处理图片
    form.parse(req, function (err, fields, files) {
        // console.log(req)
        // console.log(files.file);
        var filename = files.file.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        // var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        //var avatarName = '/' + name + '_' + date.getTime() + '.' + type;
        var avatarName = '/' + date.getTime() + '.' + type;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.file.path, newPath); //重命名

        var filePath = path.resolve('D:\\VueWorkSpace\\datacenter0107\\data-center-client\\public');//将一个路径或路径片段解析为绝对路径
        var publicPath = path.join(filePath,avatarName);
        fs.writeFileSync( publicPath, fs.readFileSync(newPath))

        let data = {};
        data.name = avatarName;
        // data.url = filedr+avatarName
        data.url = avatarName;
        datas.data = data
        console.log(data.url)
        res.send(datas)
    })
});
//完善用户信息
router.post("/improveuserinfo", function (req, res) {
    // var ruleForm = req.body
    // console.log('req.body=',ruleForm)
    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    //form.uploadDir = "./public/images";
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {
        console.log("files:",files)  //这里能获取到图片的信息
        console.log("fields:",fields) //这里能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到

    })
});

//获取所有用户数据
router.get('/userNumb',function (req,res) {
    UserModel.count({},(err, count) => {
        var count=count
        if(!err){
            res.send({code:0,data:count})
        }
    })
})

//获取所有用户信息，用于后台管理
router.get('/usersManage', function (req, res) {
    const currentPage=req.query.currentPage
    const pagesize=req.query.pagesize
    var usersInfo={};
    UserModel.count({},(err, count) => {
        usersInfo.count=count
        // console.log('select=',select)
        UserModel.find({},function (err,users) {
            usersInfo.users=users
            res.send({code:0,data:usersInfo})
            // console.log('count=',satellitesInfo.count)
        }).limit(10).skip(10*(currentPage-1))
    })
})
module.exports = router;
