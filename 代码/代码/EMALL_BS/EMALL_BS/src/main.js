import { createApp, provide } from 'vue'//导入vue
import ElementPlus from 'element-plus'//导入element-plus
import 'element-plus/dist/index.css'//导入element-plus样式
import App from './App.vue'//导入App.vue
import router from './router'//导入路由
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useUser } from './components/userUser';



const { user, updateUser } = useUser();

const app = createApp(App)//创建vue实例

// 注册icons全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.provide('user', user);
app.provide('updateUser', updateUser);
app.use(router)
app.use(ElementPlus)//使用element-plus
app.mount('#app')//挂载到#app