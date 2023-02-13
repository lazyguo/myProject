import request from '../plugins/request'
const prefix = '/api'

// 获取用户列表
interface getUserListRule {
    pageSize:number,
    pageNum:number
}
export function getUserListApi(params: getUserListRule) {
    return request({
        url: `${prefix}/userList`,
        method: 'get',
        params
    })
}
// 修改用户信息
interface editUserRule {
    username:string,
    password?:string,
    nickname:string,
    power?:string,
    email?:string,
    status?:number,
    imgUrl?:string
}
export function editUserApi(data: editUserRule) {
    return request({
        url: `${prefix}/editUser`,
        method: 'post',
        data
    })
}
// 删除用户
export function removeUserApi(id:number) {
    return request({
        url: `${prefix}/removeUser`,
        method: 'post',
        data: {
            id
        }
    })
}
// 更新用户头像，删除服务器不用图片
export function removeImgApi(path:string) {
    return request({
        url:`${prefix}/removeImg`,
        method:'post',
        data:{
            path
        }
    })
}