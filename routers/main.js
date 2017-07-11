/*
* @Author: Administrator
* @Date:   2017-07-09 20:07:51
* @Last Modified by:   RickFang666
* @Last Modified time: 2017-07-11 18:23:41
*/

'use strict';
var express = require('express')
var router = express.Router();

router.get('',function (req,res,next){
  console.log(req.userInfo);
  res.render('main/index',{
    userInfo: req.userInfo
  })
})

module.exports = router;
