/*!
 * 植入页接口
 */
import axios from 'axios'
import api from './api'

/**
 * 调用后端接口打开硬植入的web url
 * 测试阶段可以在本机用 http://127.0.0.1:8080 跑，
 * 生产环境应该部署到一台正式的服务器上，有正式的域名提供给后台 webdriver。
 */
export function triggerWebdriver() {
  let url = api.openWebDriver

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 检测用户的登录状态
 */
export function checkLoginStatus(data) {
  let url = api.loginStatus

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取用户帐号
 */
export function getXiaohuiName(data) {
  let url = api.getXiaohuiName

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取小慧ID
 */
export function getXiaohuiId(data) {
  let url = api.getXiaohuiId

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 绑定小慧帐号
 */
export function binding(data) {
  let url = api.binding

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}