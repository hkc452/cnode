//app.js
const util = require('./utils/util.js')
const apis = require('./utils/apis.js')
const checkLogin = require('./utils/auth.js') 
App({
  onLaunch: function () {
    const that = this
    util.setWxApp(that)
    try {
      // 获取设备信息
      let device = wx.getStorageSync("device")
      if (!device) {
        device = wx.getSystemInfoSync()
        wx.setStorageSync('device', device)
      }
      this.globalData.device =device


      checkLogin() 
    } catch(e) { }
    
  },
  globalData: {
    device: null,
    isLogin: false,
    userInfo: {},
    accesstoken: ''
  }
})