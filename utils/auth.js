// 专门用来校验登录之类的工具类
const util = require('./util.js')
const noop = util.noop
const getWxApp = util.getWxApp
const checkLogin = function (cb = noop) {
  let accesstoken = wx.getStorageSync("accesstoken")
  let userInfo = wx.getStorageSync("userInfo")
  let isLogin = false
  if (accesstoken && userInfo) {
    isLogin = true
    util.storeLoginInfo(userInfo, accesstoken)
    cb()
  }
  return isLogin
}
module.exports = checkLogin