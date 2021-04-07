import Cookies from 'js-cookie'
export const TOKEN_KEY = 'tokenWits'
export const WIT_KEY = 'witInfo'
export const TRANS_KEY = 'trans'


const cookieExpires = 1 // token在Cookie中存储的天数，默认1天

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, {
    expires: cookieExpires
  })
}
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}
export const setInfo = addr => {
  Cookies.set(WIT_KEY, addr, {
    expires: cookieExpires
  })
}
export const getInfo = () => {
  const addr = Cookies.getJSON(WIT_KEY)
  if (addr) {
    return addr
  } else {
    return false
  }
}
export const setTrans = trans => {
  Cookies.set(TRANS_KEY, trans, {
    expires: cookieExpires
  })
}
export const getTrans = () => {
  const trans = Cookies.getJSON(TRANS_KEY)
  if (trans) {
    return trans
  } else {
    return false
  }
}