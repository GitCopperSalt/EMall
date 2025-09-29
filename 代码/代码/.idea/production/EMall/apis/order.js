import http from "@/utils/http";
/**
 * @description: 根据user对象进行登录
 * @param {Number} id 分类id
 * @return {*}
 */
export function order(user){
  // return http.post('http://http://localhost:8080/api/user/login',user);
  return http.post('/login',user);
}