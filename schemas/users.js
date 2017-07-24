var mongoose = require('mongoose');
// 用户表结构
module.exports = new mongoose.Schema({
  username: String,
  password: String,
  // 判断是否是管理员
  isAdmin: {
    type: Boolean,
    default: false
  }
});
