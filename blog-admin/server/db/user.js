const mongoose = require("mongoose");
const {baseUrl} = require("../utils/baseURL")
const crypto = require('crypto')

let userSchema = new mongoose.Schema({
  user : {type:String,required:true},
  pwd : {type:String,required: true},

  //注册时间
  regDate : {type:Number , default:Date.now},
  //头像
  photo : {type:String,default: baseUrl+"/img/9.jpg"},
  //是否权限禁用
  disabled : {type:Boolean,default: false},
  //是否是管理员
  admin : {type:Boolean,default:true}
})
let user = mongoose.model('user', userSchema)

userSchema.pre('save', function(next) {
  let pwd = this.pwd
  this.pwd = crypto.createHash('sha256').update(pwd).digest('hex')
  next()
})
// user.create({
//   user: 'pyy',
//   pwd: crypto.createHash('sha256').update('py123321').digest('hex'),
//   admin: true
// })
module.exports = user;
