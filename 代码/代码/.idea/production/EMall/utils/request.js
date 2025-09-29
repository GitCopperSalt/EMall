//定制请求实例

//导入axios npm install axios --save
import axios from 'axios'

//定义一个变量，记录公共的前缀 ， baseURL
const baseURL = 'http://localhost:8080/api/user/login'
/* const baseURL = '/api'; */
const instance = axios.create({ baseURL });
//添加响应拦截器
instance.interceptors.response.use(
  result => { 
    return result.data;
  },
  error => {
    alert("服务器异常");
    return Promise.reject(error);
  })

  export default instance;