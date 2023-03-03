import { createApp } from "vue";
import App from "./App.vue";
// 路由
import router from "./router";
// 库
import store from "./store";
// 饿了么组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// pinia依赖
import {createPinia} from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'  // 持久化pinia数据
// 可视化大屏组件
import dataV from '@jiaminghi/data-view'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
 

const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(pinia)
app.use(dataV)
pinia.use(piniaPluginPersist)
app.use(ElementPlus,{locale:zhCn})

app.use(store).use(router).mount("#app");
