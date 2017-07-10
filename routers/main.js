/*
* @Author: Administrator
* @Date:   2017-07-09 20:07:51
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-10 00:23:06
*/

'use strict';
var express = require('express')
var router = express.Router();

router.get('',function (req,res,next){
  res.render('main/index')
})

module.exports = router;
