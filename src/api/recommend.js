import jsonp from "../common/js/jsonp";
import {commonParams, options} from "./config";
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    needNewCode: '1',
    uin: 0,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = '/api/getDissList'
  const data = Object.assign({}, commonParams, {
    needNewCode: 0,
    utf8: 1,
    disstid,
    type: 1,
    json: 1,
    onlysong: 0,
    hostUin: 0,
    platform: 'yqq',
    g_tk: 5381,
    loginUin: 0,
    outCharset: 'utf-8',
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
