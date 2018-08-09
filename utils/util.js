const apis = require('./apis.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const tabs = {
  ask: '问答',
  good: '精华',
  share: '分享',
  job: '招聘',
  dev: '客户端测试',
  top: '置顶'
}
const themeColor = '#80bd01'

const checkAccess = function (accessToken = '', cb = function(){}) {
  if (!accessToken) return
  wx.showLoading({
    title: '正在校验accessToken',
  })
  wx.request({
    url: apis.accesstoken,
    method: 'post',
    data: {
      accesstoken: accessToken
    },
    success: function (res) {
      console.log(res)
      if (res.statusCode === 200) {
        wx.setStorage({
          key: 'accesstoken',
          data: accessToken,
        })
        let { success, ...userInfo} = res.data
        console.log(userInfo)
        wx.setStorage({
          key: 'userInfo',
          data: userInfo,
        })
        cb(userInfo)
      } else {
        console.log('校验403')
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: '无效AccessToken~~',
          duration: 2000
        })
      }
    },
    complete: function () {
      wx.hideLoading()
    }
  })
}
const loginOut = function (cb = noop) {
  try {
    wx.removeStorageSync('accesstoken')
    wx.removeStorageSync('userInfo')
    clearLoginInfo()
    cb()
  } catch (e) {
  }
}
const noop = function () {

}

const checkNotReadMsg = function (accessToken) {
  try {
    accessToken = accessToken || wx.getStorageSync('accesstoken') || ''
    if (!accessToken) return
    wx.request({
      url: apis.msgCount,
      data: {
        accesstoken: accessToken
      },
      success: function (res) {
        if (res.data.data > 0) {
          wx.showTabBarRedDot({
            index: 1
          })
        }
      }
    })
  } catch (e) {

  }
}
let App = ''
const setWxApp = function (app) {
  App = app
}
const getWxApp = function () {
  return App
}
// 保存登录信息
const storeLoginInfo = function (userInfo, accesstoken) {
  App.globalData.isLogin = true
  App.globalData.userInfo = userInfo
  App.globalData.accesstoken = accesstoken
  checkNotReadMsg(accesstoken)
}
const clearLoginInfo = function () {
  App.globalData.isLogin = false
  App.globalData.userInfo = ''
  App.globalData.accesstoken = ''
}
module.exports = {
  formatTime: formatTime,
  tabs: tabs,
  themeColor: themeColor,
  checkAccess: checkAccess,
  loginOut: loginOut,
  checkNotReadMsg: checkNotReadMsg,
  noop: noop,
  setWxApp: setWxApp,
  getWxApp: getWxApp,
  storeLoginInfo: storeLoginInfo,
  clearLoginInfo: clearLoginInfo
}
