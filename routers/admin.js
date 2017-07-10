/*
* @Author: Administrator
* @Date:   2017-07-09 20:07:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-09 20:16:38
*/

'use strict';
var express = require('express')
var router = express.Router();

router.get('/user',function (req,res,next){
  res.send('user')
})

module.exports = router;

