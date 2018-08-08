//index.js
//获取应用实例
const app = getApp()
const apis = require('../../utils/apis.js')
const util = require('../../utils/util.js')
const device = app.globalData.device
const initCondition = {
  tab: '',
  page: 1
}
let lock = false
Page({
  data: {
    list: [],
    tabs: util.tabs,
    now: Date.now(),
    condition: {
      ...initCondition
    },
    height: (device.windowHeight * 750 / device.screenWidth - 60) + "rpx"
  },
  onShow: function () {
    this.setData({
      now: Date.now()
    })
  },
  onLoad: function () {
    
    this.getListData()
  },
  translate: function(tag, top) {
    console.log('translate')
    if (top) tag = 'top'
    console.log(util.tabs[tag])
    return util.tabs[tag]
  },
  clickTap: function () {
    console.log(arguments)
    let currentTarget = arguments[0].currentTarget
    this.getListData({
      page: 1,
      tab: currentTarget.dataset.tab
    })
  },
  // listScroll: function () {
  //   console.log('滚动')
  //   console.log(arguments)
  // },
  // 下拉刷新
  pre: function () {
    console.log("正在下拉")
    // wx.startPullDownRefresh()
    this.getListData(function() {
      // wx.stopPullDownRefresh()
      console.log('停止下拉')
    }, {
      page: this.data.condition.page === 1 ? this.data.condition.page : this.data.condition.page -1
    })
  },
  // 上拉加载下一页
  next: function () {
    console.log('上拉')
    this.getListData({
      page: this.data.condition.page + 1 
    })
  },
  getListData: function (cb, data = { ...initCondition}) {
    const that = this
    const noop = function () { }
    if (!cb) cb = noop
    if (Object.prototype.toString.call(cb) === '[object Object]') {
      data = cb
      cb = noop
    }
    data = Object.assign({}, this.data.condition, data)
    wx.showLoading({
      title: '正在加载数据'
    })
    wx.request({
      url: apis.topics,
      data: data,
      success: function (res) {
        console.log(res)
        if (res.data.success) {
          that.setData({
            list: res.data.data,
            condition: {...data}
          })
          cb()
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  }
})
