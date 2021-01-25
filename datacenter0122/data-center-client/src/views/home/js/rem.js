// css rem 单位转换
// 比例 1px = 0.01rem;
;
(function () {
  function init () {
    var w = document.documentElement.clientWidth
    w = w > 1920 ? 1920 : w
    document.getElementsByTagName('html')[0].style.fontSize = w / 19.2 + 'px'
  }

  function resize () {
    var timer = ''
    clearTimeout(timer)
    timer = setTimeout(init, 300)
  }

  window.addEventListener('resize', resize, false)

  init()
})()
