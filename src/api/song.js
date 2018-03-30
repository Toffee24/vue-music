import {commonParams} from "./config"
import instance from 'api/axiosAjaxRequest'

export function getLyric(mid) {
  const url = '/api/lyric'
  // const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 5381,
    hostUin: 0,
    loginUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    needNewCode: 0,
    platform: 'yqq',
    format: 'json'
  })
  return instance(url, data)
}
