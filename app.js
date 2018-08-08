//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function () {
    const that = this
    this.globalData.device = wx.getSystemInfoSync()
    try {
      let accesstoken = wx.getStorageSync("accesstoken")
      console.log(accesstoken)
      util.checkAccess(accesstoken, function (userInfo){
        console.log('userInfo', userInfo)
        that.globalData.isLogin = true
        that.globalData.userInfo = userInfo
        that.globalData.accesstoken = accesstoken
        that.userInfoReadyCallback(userInfo)
      })
    } catch(e) {

    }
    
  },
  userInfoReadyCallback: function () {
    console.log('111')
  },
  globalData: {
    device: null,
    isLogin: false,
    userInfo: {},
    accesstoken: ''
  }
})