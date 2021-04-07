import axios from './index'
import { getTrans } from '../libs/untils'
export const getData = params => {
  params.data.addr = getTrans().addr
  return axios.request({
    url: params.url,
    method: params.method,
    data: params.data,
    type: params.type
  })
}
export const getDataOth = params => {
  return axios.request({
    url: params.url,
    method: params.method,
    data: params.data,
    type: params.type
  })
}
