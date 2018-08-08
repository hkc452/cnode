const prefix = 'https://cnodejs.org/api/v1'
const apis = {
  topics: `${prefix}/topics`,
  topic: `${prefix}/topic`,
  accesstoken: `${prefix}/accesstoken`,
  msgCount: `${prefix}/message/count`,
  messages: `${prefix}/messages`  
}
module.exports = apis