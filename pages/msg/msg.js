// pages/msg/msg.js
const app = getApp()
const util = require('../../utils/util.js')
const apis = require('../../utils/apis.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readList: [],
    notReadList: [],
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    // 已经登录
    if (app.globalData.isLogin && !this.data.isLogin) {
      this.setData({
        isLogin: app.globalData.isLogin,
      })
      const that = this
      wx.showLoading({
        title: '正在获取消息...',
      })
      wx.request({
        url: apis.messages,
        data: {
          accesstoken: app.globalData.accesstoken 
        },
        success: function(res) {
          console.log(res)
          if (res.data.success) {
            that.setData({
              readList: res.data.data.has_read_messages,
              notReadList: res.data.data.hasnot_read_messages
            })
          }
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    }
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
  
  }
})