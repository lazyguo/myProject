import { setCookie,removeCookie} from '@/utils/util.cookie'
import { loginApi } from '@/api/login'

export default {
    namespace: true,
    actions: {
        login({ username = '', password = '', fromToken = '' } = {}) {
            return new Promise(async (resolve, reject) => {
                if (!fromToken) {
                    let params = {
                        username,
                        password
                    }
                    await loginApi(params).then(res => {
                        if (res.status == 0) {
                            let token = 'Bearer-' + res.data
                            setCookie('token', token)
                            setCookie('Authorization', token)
                        } else {
                            setCookie('token', fromToken)
                            setCookie('Authorization', fromToken)
                        }
                    })
                }
            })
        }
    }
}
