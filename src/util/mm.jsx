import Axios from 'axios'
import Modal from './Modal'
import React from 'react'

let _modal = new Modal()

// 请求返回的数据
/* {
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为请求提供的配置信息
  config: {}
} */

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // return Promise.reject(err)  可以中断后续的响应处理
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

class Mutil extends React.Component{
  // 统一处理请求
  request(param) {
    let defaultConfig = {
      url: '',
      method: 'get',
      baseURL: '',
      headers: {},
      params:{},
      // 适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
      data: {},
      timeout: 30000,
      // `withCredentials` 表示跨域请求时是否需要使用凭证
      withCredentials: false,
      // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json'
    }
    return new Promise((resolve, reject) => {
      Axios.request(Object.assign(defaultConfig, param)).then((res) => {
        let data = res.data
        if(0 === data.status) {
          resolve(data.data)
        } else if(10 === data.status) {
          this.doLogin()
        } else {
          reject(data.msg)
        }
      }, (err) => {
        reject('网络错误~' + err)
      })
    })
  }

  // 跳转到登录页面
  doLogin () {
    // 删除当前保存的用户信息，即使它还没过期
    this.removeStorage('userInfo')
    window.location.href = '/login?redirect=' + encodeURIComponent(location.pathname)
  }

  // 退出登录
  doLogout () {
    return this.request({
      url: '/manage/user/logout.do',
      method: 'post'
    })
  }

  // 获取链接的参数
  getUrlParam (param) {
    // p1=222&px=sss&p3=xxxx
    let search = window.location.search.split('?')[1] || ''
    let reg = new RegExp('&?'+param+"=([^&]*)&?", '')
    let res = search.match(reg)

    return res  ? decodeURIComponent(res[1]) : ''
  }

  // 错误提示
  errorTip (msg) {
    //alert(msg || '有些部件不灵光了')
    _modal.show({
      type:'error',
      desc: msg || '有些部件不灵光了'
    })
  }

  // 成功提示
  successTip (msg) {
    // alert(msg || '操作成功')
    _modal.show({
      desc: msg || '操作成功'
    })
  }

  // 去除字符俩边的空白
  trim (str) {
    return String.prototype.trim.apply(str)
  }

  // 设置本地存储
  // expireMin 分钟数，支持小数
  setStorage (name, data, expireMin) {
    let type = typeof data
    // 默认是30分钟后过期
    // 每次重新赋值就更新时间
    let setDate = +new Date() + 1000*60*(parseFloat(expireMin, 10) || 30)
    if('object' === type){
      data = JSON.stringify(data)
    } else if(['number', 'boolean', 'string'].findIndex(type) !== -1){
      data = data
    } else {
      this.errorTip(name+'=> 该类型不能应用于本地存储: '+type)
      return false
    }
    localStorage[name] = JSON.stringify({
      expire: setDate,
      value: data
    })
    return true
  }

  // 读取本地存储
  getStorage (name) {
    let item = localStorage[name]
    let data = ''
    
    // 检查是否有这个键
    if(item){
      item = JSON.parse(item)
      // 检查是否为设置了过期时间的键
      if(item.expire&&item.value){
        let now = +new Date()
        // 判断是否过期
        if(item.expire < now){
          this.removeStorage(name)
        } else {
          data = JSON.parse(item.value)
        }
      } else {
        data = JSON.parse(item)
      }
    }
    
    return data
  }

  // 删除本地存储
  removeStorage (name) {
    localStorage.removeItem(name)
  }
  // 检查是否有过期的存储
  mapStorage () {
    let now = +new Date()
    let index = 0
    while(localStorage.key(index)){
      let name = localStorage.key(index)
      let item = localStorage.getItem(name)
      item = JSON.parse(item)
      // 检查是否有设置过期标志，没有的可能是其它程序生成的，不做处理
      if(item.expire&&item.value){
        if(item.expire < now){
          this.removeStorage(name)
          // 当删除一个以后，继续检查当前位置的条目
          continue
        }
      }
      index++
    }
  }

  render(){
    return (
      <Modal />
    )
  }

}

export default Mutil