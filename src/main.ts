import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {createPinia} from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
pinia.use(piniaPluginPersist)
app.use(ElementPlus,{locale:zhCn})

app.use(store).use(router).mount("#app");
