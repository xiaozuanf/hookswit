import { getData, getDataOth } from '../server/getData'
const anaUrl = 'api/atas-analysis'
const anaManage = 'api/atas-manager'
export const readLastPowerQuality = data => { // 电能测量实时数据
  return getData({
    url: anaUrl + '/atas/analysis/screen/readLastPowerQuality',
    method: 'get',
    data: data
  })
}
export const readElectricNear = data => { // 近六个小时电量统计
  return getData({
    url: anaUrl + '/atas/analysis/screen/readElectricNear6',
    method: 'get',
    data: data
  })
}
export const readMultiPowerNear = data => { // 查询近合项有功\合项无功\视在功率数据
  return getData({
    url: anaUrl + '/atas/analysis/screen/readMultiPowerNear6',
    method: 'get',
    data: data
  })
}
export const readMulityData = data => { // 最新的三相电压,电流2-31次谐波含有率百分比数据
  return getData({
    url: anaUrl + '/atas/analysis/screen/readMulityData',
    method: 'get',
    data: data
  })
}
export const readEnviroments = data => { // 查询环境数据
  return getDataOth({
    url: anaUrl + '/atas/analysis/screen/readEnviroment',
    method: 'get',
    data: data
  })
}
export const login = data => { // 登录
  return getDataOth({
    url: anaManage + '/root/login3',
    method: 'post',
    data: data
  })
}
export const building = data => { // 根据code查询小区名称
  return getDataOth({
    url: anaManage + '/atas/manager/building/findOne',
    method: 'get',
    data: data
  })
}
export const transformer = data => { // 变压器
  return getDataOth({
    url: anaManage + '/atas/manager/transformer/findAll',
    method: 'get',
    data: data
  })
}

