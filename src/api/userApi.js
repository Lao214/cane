import request from '../utils/request'

export default {

}

export function login(loginForm) {
  return request({
    url: '/security/login',
    method: 'post',
    data: loginForm
  })
}

export function logout() {
  return request({
    url: '/security/logout',
    method: 'get',
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}