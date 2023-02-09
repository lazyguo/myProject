import request from '../plugins/request'
const prefix = '/api'

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
export function removeUserApi(id:number) {
    return request({
        url: `${prefix}/removeUser`,
        method: 'post',
        data: {
            id
        }
    })
}