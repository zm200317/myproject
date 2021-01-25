module.exports = {
  publicPath: './',
  // 上线之后console.log可以使用
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = false// true：console.log失效
    }
  },
  devServer: {
    open: false, // 是否自动弹出浏览器页面
    host: 'localhost',
    port: '8081', // 本机端口
    https: false, // 是否使用https协议
    hotOnly: false, // 是否开启热更新
    proxy: {
      '/api': {
        target: 'https://localhost/8080', // API服务器的地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
