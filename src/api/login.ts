import request from '../plugins/request'
interface loginRule {
    username: string,
    password: string
}
export function loginApi(data: loginRule) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}
export function addUserApi(data: object) {
    return request({
        url: '/api/addUser',
        method: 'post',
        data
    })
}