/*
用来定义remote_data模型
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var satelliteSchema = new Schema({
    XMLName:String,
    SatelliteID:String,
    ProductID:String,
    SceneID:String,
    SceneRow:String,
    ProduceTime:String,
    CloudPercent:Number,
    CenterLatitude:String,
    CenterLongitude:String,
    ThumbPath:String,
    ThumbFile:String
})
//定义模型
var SatelliteModel = mongoose.model('satellite_data',satelliteSchema)//卫星集合名称是satellite_data
module.exports = SatelliteModel
