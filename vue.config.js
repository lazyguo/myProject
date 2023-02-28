const { defineConfig } = require('@vue/cli-service')
// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('./src'))
    .set('@api', resolve('src/api'))
  },
  // publicPath:'./',
  // filenameHashing:true,
  // runtimeCompiler:false,
  // productionSourceMap:true,
  devServer: {
    proxy: {
        '/api': {
            target: 'http://192.168.1.71:8888/', //接口域名
            changeOrigin: true,             //是否跨域
            ws: true,                       //是否代理 websockets
            // secure: false,                   //是否https接口
            // pathRewrite: {                  //路径重置
            //     '^/api': ''
            // }
        }
    }
}
})
