import Vue from 'vue'
import axios from 'axios'
import { Loading, Message } from 'element-ui'

Vue.prototype.$globalMsg = {
  success (msg) {
    Message.success({
      message: msg,
      duration:1000
    })
  },
  error (msg) {
    Message.error({
      message: msg,
      duration:1000
    })
  }
}

// 超时时间
axios.defaults.timeout = 100000;
// http请求拦截器
// var loadinginstace;
axios.interceptors.request.use(config => {
  // element ui Loading方法
  // loadinginstace = Loading.service({ fullscreen: true });
  return config;
}, error => {
  // loadinginstace.close();
  // Message.error({
  //   message: '加载超时',
  //   duration:1000
  // })
  window.location.reload();
  return Promise.reject(error);
})

// http响应拦截器
axios.interceptors.response.use((res) => {
  if (res.data.header.code == 0) { // 请求成功
    // loadinginstace.close();
    return (res)
  } else if (res.data.header.code == -105) {
    // loadinginstace.close();
    Message.error({
      message: res.data.header.msg,
      duration: 1000
    })
    sessionStorage.clear();
    window.location.reload();
  } else {
    // loadinginstace.close();
    return (res);
  }
}, (error) => {
  // loadinginstace.close();
  return Promise.reject(error);
})

Vue.prototype.$axios = axios;

axios.defaults.baseURL = global.config.requestUrl;
