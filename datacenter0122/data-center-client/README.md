# data-center-ele

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
‘信鸽’找bug
2020.12.21:
    1.HJ2A、HJ2B页面会多次加载
    解决方案：数据库中的卫星数据信息（satellite_datas)有重复信息，
    删掉重复数据之后网页恢复正常（12.22日解决）
    
2020.12.22：
    1.打包到WAMPServer上，运行后，图片没有显示出来(白屏）    
    解决方案：路径问题，vue.config.js中加语句：publicPath:'./' 
    2.打包部署到服务器后，登录/注册界面的验证码没有出现在浏览器的Cookies上,
    即后端中cookie里的值不能写入到浏览器的cookie里去（本地运行能够获得cookie）
    
2020.12.23:
    1.开启了POP3/SMTP服务：授权码为rzfgqjmqpbwyffia
    2.尝试邮箱发送功能（成功👍）
    
2020.12.24:
    1.邮箱验证码发送成功（赞👍）
    2.完善邮箱注册功能

2021.01.07:开始版本二开发：增加后台管理操作功能（只有管理员可见）
     1.继续解决部署之后后端代码res.cookie()失效，即2020.12.22问题2（仍未解决，伤心）
     2.将vue代码规范化（将路由组件按照功能放到对应的文件夹下，共9个文件夹对应9个功能模块）
     3.完成用户管理界面
     
2021.01.08：1、优化了用户管理界面：数据库中增加了用户信息的注册时间、最后登录时间、认证情况、账号状态四个字段
     2.测试账号：qianqu  916853389@qq.com  111   普通用户

01.15:  使用require（）函数引入图片时，参数是图片路径可以成功显示图片，
        但参数是变量时，无法显示图片，Why？（一直被困扰，头疼）
        例如：require('D:\\VueWorkSpace\\datacenter0107\\datacenter_server\\routes\\upload\\1610692789446.jpg'),
        可以显示图片，但是
        var path =  'D:\\VueWorkSpace\\datacenter0107\\datacenter_server\\routes\\upload\\1610692789446.jpg';
        require（path）;
        就不可以显示图片

01.22: datacenter0107  注册的时候有“用户类型”选择
    前后端在不同的电脑上时要设置：前端：api/index.js里要设置
    const BASE_URL = 'http://192.168.137.40:8080'// 后端服务器地址
