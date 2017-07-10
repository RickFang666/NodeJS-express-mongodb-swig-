/*
* @Author: Administrator
* @Date:   2017-07-09 17:27:53
* @Last Modified by:   RickFang666
* @Last Modified time: 2017-07-10 20:45:58
*/
'use strict';
// 加载express模块
var express = require('express')
// 加载模板处理模块
var swig = require('swig')
// 加载数据库模块
var mongoose = require('mongoose');
// 加载body-parse，用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 创建app应用==>NodeJS http.createServer();
var app = express();
// 设置静态文件托管,当用户访问url以、/public开头，直接返回
// 对应文件夹__dirname + '/public'下的文件
app.use('/public',express.static(__dirname + '/public'))

/*配置应用模板
*定义当前用所使用的模板引擎
*第一个参数：模板引擎名称，同时也是模板文件的后缀
*第二个参数表示用于解析模板内容的方法
*/
app.engine('html',swig.renderFile);

// 设置模板文件存放目录，第一个参数必须是views，第二个是目录
app.set('views','./views')

/* 注册模板引擎，第一个参数必须是view engine，
* 第二个参数和app.engine这个方法定义的模板引擎名字是一致的
*/
app.set('view engine','html')

//开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});
//bodyPrase 设置
app.use(bodyParser.urlencoded({extended: true}));
//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('',require('./routers/main'));
// 加载数据库模块
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27018/blog',{useMongoClient:true},function (err){
    if(err){
      console.log('数据库连接失败')
    }else {
      console.log('数据库连接成功')
    }
    app.listen(8088);
})

/*
* 首页
* req requset对象
* res response对象
* next 函数
*/
// app.get('/',function(req,res,next){
  /*读取views目录下的指定文件，解析并返回给客户端
  * 第一个参数表示模板的文件,相对于目录 views/index.html
  *
  */
//   res.render('index');
// })

//监听http请求








