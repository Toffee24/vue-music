import axios from 'axios'

let baseParam = {
  g_tk: '5381',
  uin: 0,
  format: 'json',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5',
  needNewCode: 1,
}

function axiosRequest(url,data) {
  let params = Object.assign({},data,baseParam)
  return new Promise((resolve,reject)=>{
    axios.get(url,{
      params:params
    }).then((res)=>{
      resolve(res)
    }).catch((res)=>{
      reject(res)
    })
  })
}

export default axiosRequest
