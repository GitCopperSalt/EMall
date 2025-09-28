import axios from 'axios';
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css'


const http = axios.create({
   baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',// api地址
  timeout: 5000 // 请求超时时间
});


//axios请求拦截器
//一般会进行token验证，请求头设置等操作
http.interceptors.request.use(config => {
  // 在发送请求之前做某事
  return config;
}, e => Promise.reject(e));


//axios响应拦截器
//一般会对响应数据做一些处理，比如token失效，重新登录等操作
http.interceptors.response.use(res => res.data,e =>{
    //统一错误提示
    ElMessage({
      type: 'error',
      message: e.response.data.message
  })

  return Promise.reject(e)
})
export default http;