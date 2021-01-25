/*
用来定义remote_data模型
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var satelliteSizeSchema = new Schema({
    FileName:String,
    SatelliteID:String,
    Size:Number
})
//定义模型
var SatelliteSizeModel = mongoose.model('satellite_size',satelliteSizeSchema)//卫星集合名称是satellite_data
module.exports = SatelliteSizeModel
