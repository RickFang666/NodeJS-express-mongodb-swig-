'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
// 初始化返回数据，统一返回格式
var responseData;
router .use(function (req,res,next){
  responseData = {
    code: 0,
    message: ''
  }
  next();
})
router.post('/user/register',function (req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;

  // 用户名不能为空
  if(username == ''){
    responseData.code = 1;
    responseData.message = '用户名不能为空';
    res.json(responseData);
    return;
  }
  // 密码不能为空
  if(password == ''){
    responseData.code = 2;
    responseData.message = '密码不能为空';
    res.json(responseData);
    return;
  }
  // 两次输入密码一致
  if(password!=repassword){
    responseData.code = 3;
    responseData.message = '两次输入密码不一致';
    res.json(responseData);
    return;
  }

  // 用户名是否已被注册，查询数据库是否存在要注册的用户名同名数据
  //findOne 返回是promise对象
  User.findOne({
    username:username
  }).then(function (userInfo){
      // 如果数据库已有改用户名记录
      if(userInfo) {
        responseData.code = 4;
        responseData.message = '用户名已被注册';
        res.json(responseData);
        return
      }
      // 否则保存用户注册信息到数据库中
      var user = new User({
        username: username,
        password: password
      });
      return user.save();
  }).then(function (newUserInfo){
      console.log(newUserInfo);
      responseData.message = '注册成功';
      res.json(responseData);
  })
})

router.post('/user/login',function (req,res){
  var username = req.body.username;
  var password = req.body.password;
  if(username==''||password==''){
    responseData.code=1;
    responseData.message='用户名或密码不能为空';
    res.json(responseData);
    return;
  }
//查询数据库中相同用户名密码是否存在
  User.findOne({
    username: username,
    password: password
  }).then(function (userInfo){
    if(!userInfo){
      responseData.code = 2;
      responseData.message ='用户名或密码错误';
      res.json(responseData);
      return;
    }
    responseData.message = '登录成功';
    responseData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username
    }
    req.cookies.set('userInfo',JSON.stringify({
      _id: userInfo._id,
      username: userInfo.username
    }))
    res.json(responseData);
    return;
  })
})
// 退出登录
router.get('/user/logout',function (req,res){
  req.cookies.set('userInfo',null);
  res.json(responseData);
})

module.exports = router;
