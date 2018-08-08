// pages/user/user.js
const app = getApp()
const device = app.globalData.device
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: app.globalData.isLogin,
    userInfo: app.globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    if (app.globalData.isLogin) {
      console.log('fix')
      this.setData({
        isLogin: app.globalData.isLogin,
        userInfo: app.globalData.userInfo
      })
    } else {
      app.userInfoReadyCallback = function (userInfo) {
        that.setData({
          isLogin: true,
          userInfo: userInfo
        })
      }
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  scanCode: function () {
    const that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        let accesstoken = res.result
        util.checkAccess(accesstoken, function (userInfo) {
          app.globalData.isLogin = true
          app.globalData.accesstoken = accesstoken
          app.globalData.userInfo = userInfo
          that.setData({
            isLogin: true,
            userInfo: userInfo
          })
          util.checkNotReadMsg(accesstoken)
        })
        
      }
    })
  },
  loginOut: function () {
    const that = this
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          util.loginOut(function() {
            app.globalData.isLogin = false
            app.globalData.accesstoken = ''
            app.globalData.userInfo = {}
            that.setData({
              isLogin: false,
              userInfo: {}
            })
          })
        } 
      }
    })
  }
})