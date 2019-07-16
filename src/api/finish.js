/*!
 * 首页接口
 */
import axios from 'axios';
import api from './api'

/**
 * 获取已绑定的小慧帐号
 */
export function getAccount(data) {
  let url = api.getAccount

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getLogList(data) {
  let url = api.getLogList

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}