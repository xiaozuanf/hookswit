import Axios from 'axios'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '../libs/untils'
//const baseURL = '/api'
const baseURL = 'http://10.168.10.202:80/'
console.log(baseURL)
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 截取参数拼接到url上
  getUrlFormData (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret.substring(0, ret.length - 1)
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }

  // 请求拦截
  interceptors (instance, options) {
    let _this = this
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      config.headers['Content-Type'] = options.type || 'application/x-www-form-urlencoded'
      if (!config.url.includes('/login')) {
        config.headers['token'] = Cookies.get(TOKEN_KEY)
        //config.headers['token'] = 'a5173e68-7af4-453b-b561-ac44a11d8d92'
        // config.headers['token'] = 'test_123'
      }
      if (!options.type) {
        if (config.method || options.formUrl) {
          config.url = `${config.url}?${_this.getUrlFormData(config.data)}`
        } else {
          config.transformRequest = [
            function (data) {
              return _this.getUrlFormData(data)
            }
          ]
        }
      }
      return config
    }, error => {
      // 对请求错误做些什么
      // console.log("error")
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let { data } = res
      // console.log("resPONSE")
      if (!(data instanceof Blob)) {
        if (data.code !== 200) {
          // 后端服务在个别情况下回报201，待确认
          if (data.code === 401) {
            Cookies.remove(TOKEN_KEY)
            window.location.href = '/#/login'
            return false
          }
        } else {
          return data.data
        }
      }
    }, (error) => {
      // console.log("resPONSError")
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  // 创建实例
  create (config) {
    // axios.defaults.baseURL = process.env.API_ROOT;
    let conf = {
      baseURL: baseURL,
      ...config
    }
    return Axios.create(conf)
  }

  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }

  // 请求实例
  request (options) {
    // console.log(options)
    let instance = this.create(options)
    this.interceptors(instance, options)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

export default httpRequest
