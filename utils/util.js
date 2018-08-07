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

module.exports = {
  formatTime: formatTime,
  tabs: tabs,
  themeColor: themeColor
}
