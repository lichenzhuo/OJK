let sessionid = sessionStorage.getItem('sessionid');

// 公共头部需要的方法
const GlobaFn = {
  last_time: function (time) {
    if (time <= 0) {
      return false
    } else {
      let days = parseInt(time / 1000 / 60 / 60 / 24, 10) // 天数
      let hours = parseInt(time / 1000 / 60 / 60 % 24, 10) // 时
      let minutes = parseInt(time / 1000 / 60 % 60, 10)// 分钟
      let seconds = parseInt(time / 1000 % 60, 10)// 秒数
      let result = ''
      if (days > 0) {
        result += `${days}天`
      }
      hours = this.format(hours)
      minutes = this.format(minutes)
      seconds = this.format(seconds)
      result += `${hours}:${minutes}:${seconds}`
      return result
    }
  },
  format: function (val) {
    val = Number(val)
    return (val < 10 ? '0' + val : val)
  },

  now: function () {
    let date = new Date()
    let o = {
      yyyy: date.getFullYear(),
      m: this.format((date.getMonth() + 1)),
      dd: this.format(date.getDate()),
      hh: this.format(date.getHours()),
      mm: this.format(date.getMinutes()),
      ss: this.format(date.getSeconds()),
      S: date.getMilliseconds()
    }
    return (`${o.yyyy}-${o.m}-${o.dd} ${o.hh}:${o.mm}:${o.ss}.${o.S}`)
  },
  time: function (t) {
    let date = new Date(t)
    let o = {
      yyyy: date.getFullYear(),
      m: this.format((date.getMonth() + 1)),
      dd: this.format(date.getDate()),
      hh: this.format(date.getHours()),
      mm: this.format(date.getMinutes()),
      ss: this.format(date.getSeconds())
    }
    return (`${o.yyyy}-${o.m}-${o.dd} ${o.hh}:${o.mm}:${o.ss}`)
  }
}
// axios请求头部公共信息
const BaseHeader = {
  code: 0,
  devicetype: 3,
  msgtype: 0,
  sendingtime: GlobaFn.now(),
  version: '1.0.01',
  sessionid
}

const postHeader = {
  getters: {
    getBaseHeader: ()=>(code,obj,pageObj)=>{// 转换经纬度
      var option = obj||{};
      option.header = BaseHeader;
      option.header.action = code;
      if(pageObj){
        option.header.page = pageObj
      }
      return option
    }
  }
}

export default postHeader
