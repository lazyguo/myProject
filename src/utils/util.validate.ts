//校验用户名
export const validPassword = (rule: any, value: any, callback: any) => {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
    if (!reg.test(value)) {
        callback(new Error('密码必须是由4-20位字母+数字组合'))
    } else {
        callback()
    }
}
// 检验密码框
export const validatePassword = (value: string, callback: any) => {
    const pwdRegex = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/)
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else if (!pwdRegex.test(value)) {
        callback(new Error('密码必须为6-12位字母和数字组合'))
    } else {
        callback()
    }
}

// 检验邮箱
export const validateEmail = (value: string, callback: any) => {
    const emailRegex = new RegExp(/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/)
    if (!emailRegex.test(value)) {
        callback(new Error('邮箱格式不正确'))
    } else {
        callback()
    }
}
// 不能输入汉字
export const checkNoChinese = (rule: any, value: any, callback: any) => { //不能输入汉字
    if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
            callback(new Error('不能输入汉字!'));
        } else {
            callback();
        }
    }
    callback();
}
