import jsonp from "../common/js/jsonp"
import {commonParams, options} from "./config"
import axiosRequest from './axiosAjaxRequest'

export function getTopList(singerId) {
  const url = '/api/getRankList'
  const data = Object.assign({}, commonParams, {
    needNewCode: 1,
    platform: 'h5',
    format: 'json',
  })
  return axiosRequest(url, data)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    needNewCode: 1,
    platform: 'h5',
    page: 'detail',
    type: 'top',
    tpl: 3,
    format: 'json',
    topid
  })
  // return axiosRequest(url, data)
  return jsonp(url, data, options)
}
