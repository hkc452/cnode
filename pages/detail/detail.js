// pages/detail/detail.js
var apis = require('../../utils/apis.js')
var WxParse = require('../../libs/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: {},
    now: Date.now(),
    article: {},
    replyTemArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.showLoading({
      title: '正在加载帖子',
    })
    wx.request({
      url: `${apis.topic}/${options.id}`,
      success: function (res) {
        if (res.data.success) {
          that.setData({
            topic: res.data.data
          })
          WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
          if (res.data.data.replies.length > 0) {
            let replyArr = res.data.data.replies
            for (let i = 0; i < replyArr.length; i++) {
              WxParse.wxParse('reply' + i, 'html', replyArr[i].content, that);
              if (i === replyArr.length - 1) {
                WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
              }
            }
          }
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
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
  
  }
})