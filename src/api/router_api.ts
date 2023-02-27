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

// 更新路由信息
export function updateRouterApi(data:addRouterRule) {
    return request({
        url: `${prefix}/updateRouter`,
        method: 'post',
        data
    })
}

// 删除路由
export function removeRouterApi(id:number) {
    return request({
        url:`${prefix}/removeRouter?id=${id}`,
        method:'get',
    })
}