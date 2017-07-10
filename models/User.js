/*
* @Author: Administrator
* @Date:   2017-07-10 00:16:45
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-10 00:18:52
*/

'use strict';
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users.js');
module.exports = mongoose.model('User',usersSchema);
