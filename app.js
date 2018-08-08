//app.js
const util = require('./utils/util.js')
const apis = require('./utils/apis.js')
App({
  onLaunch: function () {
    const that = this
    this.globalData.device = wx.getSystemInfoSync()
    try {
      let accesstoken = wx.getStorageSync("accesstoken")
      util.checkAccess(accesstoken, function (userInfo){
        console.log('userInfo', userInfo)
        that.globalData.isLogin = true
        that.globalData.userInfo = userInfo
        that.globalData.accesstoken = accesstoken
        that.userInfoReadyCallback(userInfo)
        util.checkNotReadMsg(accesstoken)
      })
    } catch(e) {

    }
    
  },
  userInfoReadyCallback: util.noop,
  globalData: {
    device: null,
    isLogin: false,
    userInfo: {},
    accesstoken: ''
  }
})