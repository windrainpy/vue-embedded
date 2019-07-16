/*!
 * 首页接口
 */
import axios from 'axios';
import api from './api'

/**
 * 获取全部应用
 */
export function getAllApps() {
  let url = api.getAllApps

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取当前用户已经植入的应用
 */
export function getMyApps() {
  let url = api.getMyApps

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}