//index.js
//获取应用实例
const app = getApp()
const apis = require('../../utils/apis.js')
const util = require('../../utils/util.js')
console.log(apis)
Page({
  data: {
    list: [],
    tabs: util.tabs,
    now: Date.now(),
  },
  onLoad: function () {
    const that = this
    wx.showLoading({
      title:'正在加载数据'
    })
    wx.request({
      url: apis.topics,
      data: {
      },
      success: function (res) {
        // console.log(res.data)
        if (res.data.success) {
          that.setData({
            list: res.data.data
          })
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  translate: function(tag, top) {
    console.log('translate')
    if (top) tag = 'top'
    console.log(util.tabs[tag])
    return util.tabs[tag]
  },
})
