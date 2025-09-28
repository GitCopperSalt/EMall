import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'//导入element-plus
import 'element-plus/dist/index.css'//导入element-plus样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { getCategoryAPI } from './apis/layout'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/icons.svg'; // 引入 SVG Sprite



const app = createApp(App)//创建vue实例
const pinia  = createPinia();

// 注册icons全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)

app.use(ElementPlus)//使用element-plus
getCategoryAPI().then(res => {
  console.log(res)
})//测试API接口

app.mount('#app')//挂载到#app