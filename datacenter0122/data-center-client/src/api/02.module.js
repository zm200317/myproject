console.log('hello  node')
var x = 10
var y = 20

/*
  向外部暴露属性或方法
* 我们可以通过exports向外部暴露变量和方法
  只需要将需要暴露给外部的变量或方法设置为exports的属性即可
* */
exports.x = '我是02'
exports.fn = function () {
  console.log(x)
}
exports.add = function (a, b) {
  var c = a + b
  return c
}
exports.mul = function (a, b) {
  var c = a * b
  return c
}
