/*
* @Author: Administrator
* @Date:   2017-07-09 20:07:33
* @Last Modified by:   RickFang666
* @Last Modified time: 2017-07-11 22:38:55
*/

'use strict';
var express = require('express')
var router = express.Router();
var User = require('../models/User')

router.use(function (req,res,next){
    // 如果当前用户不是管理员
    if(!req.userInfo.isAdmin) {
      res.send('对不起，只有管理员才能进入后台管理')
      return;
    }
    next()
})

router.get('/',function (req,res,next){
  res.render('admin/index',{
    userInfo: req.userInfo
  })
})

router.get('/user',function (req,res,next){
  /*获取数据与限制分页
  *limit(number):限制每次从数据库回去数据条数
  *skip(number):获取时跳过前面数据条数
  *
  */
 var page =Number(req.query.page)|| 1;
 console.log(page);
 var limit = 2;
 var skip = (page-1)*limit;
 User.count().then(function(count){

  //计算总页数
  var pages = Math.ceil(count/limit);
  // 取值不能超过pages
  page = Math.min(page,pages)
  // 取值不能小于1
  page = Math.max(page,1)
  User.find().limit(limit).skip(skip).then(function (users){
   res.render('admin/user_index',{
      userInfo: req.userInfo,
      users: users,
      count: count,
      pages: pages,
      page: page
    });
  });
 })
})

 router.get('/category',function (req,res,next){
     res.render('admin/category',{

     })
 })

module.exports = router;

