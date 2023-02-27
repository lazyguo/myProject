import request from '../plugins/request'
const prefix = '/api'

// 获取路由列表
export function getRouterListApi() {
    return request({
        url: `${prefix}/getRouterList`,
        method: 'get',
    })
}


// 新增路由
interface addRouterRule {
    id?:number,
    pid:number,
    sort:number,
    name:string,
    path:string,
    powerMark:string,
    type:string,
    icon?:string
}
export function addRouterApi(data:addRouterRule) {
    return request({
        url: `${prefix}/addRouter`,
        method: 'post',
        data
    })
}