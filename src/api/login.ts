import request from '../plugins/request'
let prefix = '/api'
// 登录接口
interface loginRule {
    username: string,
    password: string
}
export function loginApi(data: loginRule) {
    return request({
        url: `${prefix}/login`,
        method: 'post',
        data
    })
}
export function logoutApi() {
    return request({
        url:`${prefix}/logout`,
        method:'post'
    })
}
// 获取用户信息
export function getUserInfoApi(username:string) {
    return request({
        url:`${prefix}/getUserInfo`,
        method:'get',
        params:{
            username
        }
    })
}
// 注册用户
export function addUserApi(data: object) {
    return request({
        url: `${prefix}/addUser`,
        method: 'post',
        data
    })
}