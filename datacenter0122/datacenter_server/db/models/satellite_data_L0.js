/*
用来定义remote_data模型
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var satelliteL0Schema = new Schema({
    SatelliteID:String,
    FileName:String,
    Date:String,
    Size:String,
    Type:String,
    FilePath:String
})
//定义模型
var SatelliteL0Model = mongoose.model('satellite_data_L0',satelliteL0Schema)//ZY1E 0级数据集合名称是satellite_data_L0
module.exports = SatelliteL0Model
