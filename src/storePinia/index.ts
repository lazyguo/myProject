import { defineStore } from 'pinia'
import { loginApi,getUserInfoApi,logoutApi } from '@/api/login'
import { setCookie,removeCookie } from '@/utils/util.cookie'
export const loginStore = defineStore('start', {
    persist:{
        enabled:true,
        strategies:[
            {
                key:'userInfo',
                storage:localStorage
            }
        ]
    },
    state:() => {
        return {
            userInfo:{
                power:''
            }
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
                        resolve('success')
                    })
                    .catch(err => {
                        reject(err)
                    })
                } else {
                    setCookie('token', fromToken)
                    setCookie('Authorization', fromToken)
                    this.getInfo(username)
                    resolve('success')
                }
            })
        },
        // 获取用户信息
        getInfo(username:string) {
            getUserInfoApi(username).then(res => {
                if(res.status == 0) {
                    this.userInfo = res.data
                }
            })
        },
        // 退出登录
        logout() {
            return new Promise((resolve,reject) => {
                logoutApi().then(res => {
                    if(res.status == 0) {
                        removeCookie('token')
                        removeCookie('Authorization')
                        localStorage.removeItem('userInfo')
                        resolve("success")
                    }
                })
            })
        }
    }
})