import Cookie from 'js-cookie'

export const setCookie = (name:string="default",value:string='',cookieSetting?:any) => {
    let currentCookie = {
        expires: 1  //失效期限
    }
    Object.assign(currentCookie,cookieSetting)
    Cookie.set(`${name}`,value,currentCookie)
}

export const getCookie = (name="default") => {
    return Cookie.get(`${name}`)
}

export const getAllCookie = () => {
    return Cookie.get()
}

export const removeCookie = (name='default') => {
    return Cookie.remove(`${name}`)
}
