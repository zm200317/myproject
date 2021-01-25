const compressing = require('compressing');
var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
require('./conn_mongodb')//连接数MongoDB据库
const SatelliteModel = require('../models/satellite_data')
const SatelliteSizeModel = require('../models/satellite_size')
const SatelliteL0Model = require('../models/satellite_data_L0')
var formatDate = require('../..' +  '/formatDate.js')//格式化日期
//解析需要遍历的文件夹
var filePath1 = path.resolve('D:\\Remote_sensing_images');
var satellitePath=[];
var satellitesPath=[];

//调用文件解压缩方法
fileUncompression(filePath1);

//调用卫星信息遍历方法，将卫星信息存储到数据库
satelliteInfo();

/*//格式化时间显示
Date.prototype.Format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'H+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'S+': this.getMilliseconds()
    };
    //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
    if (/(y+)/.test(fmt)) {
        //第一种：利用字符串连接符“+”给date.getFullYear()+''，加一个空字符串便可以将number类型转换成字符串。
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
        }
    }
    return fmt;
};*/

var filePath = path.resolve('D:\\Remote_sensing_images\\ZY1E0级数据');
fileZy1el0(filePath);

function fileZy1el0(filePath){
    //根据文件路径读取文件，返回文件列表
    var files = fs.readdirSync(filePath)
    //遍历读取到的文件列表
    files.forEach(function(filename){
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);

        //根据文件路径获取文件信息，返回一个fs.Stats对象
        var SatelliteID = 'ZY1E'
        var stats = fs.statSync(filedir)
        var isFile = stats.isFile();//是文件
        var isDir = stats.isDirectory();//是文件夹
        if(isFile){
            if(filename.indexOf("DAT") != -1){
                console.log(filename)
                var FileName = filename.slice(0,filename.length-4)
                var Size = (stats.size/1024/1024).toFixed(0) + ' MB'
                var FilePath=filedir
                var Type = 'DAT'
                 //文件创建时间，只显示年月日时分秒
                // var Date=stats.ctime.Format('yyyy-MM-dd HH:mm:ss');
                var Date=formatDate.dateFormt('yyyy-MM-dd HH:mm:ss',stats.ctime)
                new SatelliteL0Model({
                    SatelliteID,
                    FileName,
                    Date,
                    Size,
                    Type,
                    FilePath
                }).save(function (err, satellite) {
                    // console.log('保存成功')
                    console.log(filename,satellite.Date)
                })
            }

        }
        else if(isDir){

        }

    });
}



/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
//文件遍历方法
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    var files = fs.readdirSync(filePath)
    // console.log(files)
    //遍历读取到的文件列表
    files.forEach(function(filename){
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        // console.log(filename)
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        var stats = fs.statSync(filedir)
        var isFile = stats.isFile();//是文件
        var isDir = stats.isDirectory();//是文件夹
        if(isFile){
            satellitePath.push(filedir)

        }
        else if(isDir){
            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            satellitesPath.push(satellitePath)
            satellitePath=[]
        }

    });
}

function fileUncompression(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isDir)
                        {
                            fileUncompression(filedir)
                        }
                        //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1。
                        if(filedir.indexOf(".tar") != -1)
                        {

                            var destDir = 'D:/uncompression_remoteData/'
                            //解压缩之后的文件夹名称：去掉压缩文件后缀名，即去掉“.tar”
                            var newfilename = filename.slice(0,filename.length-4)
                            var newfiledir = path.join(destDir,newfilename)
                            var FileName = filename
                            var SatelliteID = filename.split('_')[0]
                            var Size = (stats.size/1024/1024/1024).toFixed(3)
                            new SatelliteSizeModel({
                                FileName,
                                SatelliteID,
                                Size
                            }).save(function (err, satellite) {
                                console.log('保存成功')
                                console.log(satellite.SatelliteID)
                            })
                            // console.log(destDir)
                             fs.exists(newfiledir, function (exists) {
                                //如果解压缩文件夹不存在就解压缩
                                 if(!exists){
                                    compressing.tar.uncompress(filedir, destDir)
                                        .then(() => {
                                            console.log('success');
                                            console.log(filedir)
                                        })
                                        .catch(err => {
                                            console.error(err);
                                        });
                                 }
                             })

                        }
                    }
                })
            });
        }
        console.log('程序运行结束')
    });
}
// var XMLName,ThumbPath,SatelliteID,ProductID,SceneID,SceneRow,ProduceTime,CloudPercent,CenterLatitude,CenterLongitude
//读取所有卫星的XML信息，并将相关信息放入数据库
function satelliteInfo() {
    var filedir = 'D:\\uncompression_remoteData'
    fileDisplay(filedir)
    console.log('satellitePath=',satellitesPath)
    //遍历读取到的文件列表
    satellitesPath.forEach(function(filenames){
        var XMLName,ThumbPath,SatelliteID,ProductID,SceneID,SceneRow,ProduceTime,CloudPercent,CenterLatitude,CenterLongitude,ThumbFile
        filenames.forEach(function(filename) {
            if ((filename.indexOf(".thumb.jpg") != -1) || (filename.indexOf(".Browse.jpg") != -1) || (filename.indexOf(".jpg") != -1)) {
                filename = filename.replace(/\\/g, '/')
                ThumbPath =  filename
                var arr = filename.split('/')
                ThumbFile=arr[3]
            }
            else if ((filename.indexOf(".xml") != -1) && (filename.indexOf('order') == -1)) {
                let data = fs.readFileSync(filename);
                var parser = new xml2js.Parser({explicitArray: false, ignoreAttrs: true, trim: true});
                parser.parseString(data, function (err, result) {
                     XMLName = filename
                     SatelliteID = result.ProductMetaData.SatelliteID
                     ProductID = result.ProductMetaData.ProductID
                     SceneID = result.ProductMetaData.SceneID
                     SceneRow = result.ProductMetaData.SceneRow
                     ProduceTime = result.ProductMetaData.ProduceTime.split(' ')[0]
                     CloudPercent = Number(result.ProductMetaData.CloudPercent)
                     CenterLatitude = (result.ProductMetaData.CenterLatitude*1).toFixed(4)
                     CenterLongitude = (result.ProductMetaData.CenterLongitude*1).toFixed(4)
                     // console.log(ThumbPath)
                     SatelliteModel.findOne({ProductID, SceneID}, function (err, satellite) {
                        // console.log(satellite)
                        //如果已存在
                        /* if (satellite) {
                             console.log('已存在')
                         } else {//不存在*/
                            // console.log(satellite)
                            //保存到数据库
                            new SatelliteModel({
                                XMLName,
                                SatelliteID,
                                ProductID,
                                SceneID,
                                SceneRow,
                                ProduceTime,
                                CloudPercent,
                                CenterLatitude,
                                CenterLongitude,
                                ThumbPath,
                                ThumbFile
                            }).save(function (err, satellite) {
                                console.log('保存成功')
                                console.log(satellite.SatelliteID)
                            })
                         /*}*/

                    })

                });
            }
            else{
                // fs.unlinkSync(filename)
            }
        })
    });
}
