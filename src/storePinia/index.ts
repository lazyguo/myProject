import { defineStore } from 'pinia'
import { loginApi, getUserInfoApi, logoutApi } from '@/api/login'
import { getRouterListApi } from '@/api/router_api'
import { setCookie, removeCookie } from '@/utils/util.cookie'
export const loginStore = defineStore('start', {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'userInfo',
                paths: ['userInfo'],
                storage: localStorage
            },
            {
                key: 'routeList',
                paths: ['routeList'],
                storage: localStorage
            }
        ]
    },
    state: () => {
        return {
            userInfo: {
                power: ''
            },
            routeList: [],
        }
    },
    actions: {
        login({
            username = "",
            password = "",
            fromToken = ""
        } = {}) {
            return new Promise((resolve, reject) => {
                if (!fromToken) {
                    let params = {
                        username,
                        password
                    }
                    loginApi(params).then(res => {
                        let token = 'Bearer-' + res.data
                        setCookie('token', token)
                        setCookie('Authorization', token)
                        this.getInfo(username)
                        this.saveRouter()
                        resolve({
                            status: 'success',
                            power: this.userInfo.power
                        })
                    })
                        .catch(err => {
                            reject(err)
                        })
                } else {
                    setCookie('token', fromToken)
                    setCookie('Authorization', fromToken)
                    this.getInfo(username)
                    resolve({
                        status: 'success',
                        power: this.userInfo.power
                    })
                }
            })
        },
        // 获取用户信息
        getInfo(username: string) {
            getUserInfoApi(username).then(res => {
                if (res.status == 0) {
                    this.userInfo = res.data
                }
            })
        },
        // 退出登录
        logout() {
            return new Promise((resolve, reject) => {
                logoutApi().then(res => {
                    if (res.status == 0) {
                        removeCookie('token')
                        removeCookie('Authorization')
                        localStorage.removeItem('userInfo')
                        resolve("success")
                    }
                })
            })
        },
        saveRouter() {
            function dealData(child: []) {
                if (child.length > 0) {
                    let arr: any = []
                    child.forEach((c: any) => {
                        arr.push({
                            path: c.path.split('/').at(-1),
                            component: routerCom(c.path),
                            name: c.powerMark,
                            children: dealData(c)
                        })
                    })
                    return arr
                }
            }
            getRouterListApi().then(res => {
                if (res.status == 0) {
                    let list = res.data.map((item: any) => {
                        return {
                            path: '/' + item.path.split('/').at(-1),
                            component: routerCom(item.path),
                            name: item.powerMark,
                            children: dealData(item.children)
                        }
                    })
                    this.routeList = list
                }
            })
            function routerCom(path: string) { //对路由的component解析
                return () => require(`@/views/${path}`);
            }
        }
    }
})