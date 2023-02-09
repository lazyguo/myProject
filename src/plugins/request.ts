import axios from 'axios'
const serve = axios.create({
    baseURL: 'http://192.168.1.71:8888',
    timeout: 5000,
})

serve.interceptors.request.use(
    function (config) {
        // 发送请求前做什么
        return config
    },
    function (error) {
        // 对错误做什么
        console.log('Error' + error);
        return Promise.reject(error)
    }
)
serve.interceptors.response.use(
    function (response) {
        // 2xx 的触发该函数
        const dataAxios = response.data
        const { status } = response
        if (status == undefined) {
            return dataAxios
        } else {
            let s = status
            let msgInfo = dataAxios.msg || dataAxios.message
            switch (s) {
                case 200:
                    break;
                case 401:
                    console.log(msgInfo);

                    break;

                default:
                    // 不是正确的 state
                    console.log(msgInfo);
                    break
            }
        }

        return dataAxios
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '未授权，请登录'
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
        }
        console.log(error);

        return Promise.reject(error)
    }
)

export default serve