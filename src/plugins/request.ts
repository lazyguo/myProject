import axios from 'axios'
const serve = axios.create({
    baseURL:'http://192.168.1.23',
    timeout:5000,
})

serve.interceptors.request.use(
    function(config) {
        // 发送请求前做什么
        return config
    },
    function(error) {
        // 对错误做什么
        console.log('Error' + error);
        return Promise.reject(error)
    }
)
serve.interceptors.response.use(
    function (response) {
        // 2xx 的触发该函数
        console.log(response);
        const dataAxios = response.data

        return dataAxios
    },
    function (error) {
        // 2xx 以外的触发该函数
        console.log('Error!' + error);
        return Promise.reject(error)
        
    }
)

export default serve