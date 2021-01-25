const express = require('express')
// const cors = require('cors')
const app = express()
// app.use(cors())// 解决跨域
// 以下注释部分据说是另一种解决跨域问题的方法
app.all('*', function (req, res, next) { // 设置跨域访问
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
var infor = { // 定义一个数组数据，待会通过请求传给前端

  name: 'jay',
  age: 20,
  sex: '男',
  hobby: 'basketball'
}

var xml = { // 定义一个数组数据，待会通过请求传给前端
  'SatelliteID': 'GF5',
  'ReceiveStationID': 'KRN',
  'ReceiveStationID1': 'GF5',
  'SatelliteID1': 'ZY01E',
  'ReceiveStationID3': 'KRN',
  'ReceiveStationID14': 'GF5',
  'SatelliteID2': 'GF5',
  'ReceiveStationID2': 'KRN',
  'ReceiveStationID21': 'GF5',
  'SatelliteID21': 'GF5',
  'ReceiveStationID24': 'KRN',
  'ReceiveStationID143': 'GF5'
}

// 定义显示卫星图片接口路由
app.get('/satellite', function (req, res) {
  res.status(200)
  res.json(infor)
})
// 定义卫星XML详情接口路由
app.get('/detail', function (req, res) {
  res.status(200)
  res.json(xml)
})
const server = app.listen(8082, function () {
  const { address, port } = server.address()
  console.log('http server is running http://%s :%s', address, port)
})
