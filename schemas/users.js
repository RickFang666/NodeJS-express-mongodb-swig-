/*
* @Author: Administrator
* @Date:   2017-07-09 20:29:24
* @Last Modified by:   RickFang666
* @Last Modified time: 2017-07-10 20:44:12
*/

'use strict';
var mongoose = require('mongoose');
// 用户表结构
module.exports = new mongoose.Schema({
  username: String,
  password: String,
});
