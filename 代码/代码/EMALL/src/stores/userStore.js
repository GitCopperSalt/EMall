import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia';



export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    clearUserInfo() {
      this.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  }
});


// export const useUserStore = defineStore('user', () => {
//   // 1. 定义管理用户数据的state
//   const userInfo = ref({})
//   // 2. 定义获取接口数据的action函数
//   const getUserInfo = async (user) => {
//     const res = await loginAPI(user)
//     userInfo.value = res.result
//     console.log(userInfo.value+'用户信息')
//     console.log(res)
//   } 
//   // 退出时清除用户信息
//   const clearUserInfo = () => {
//     userInfo.value = {}
//   }
//   // 3. 以对象的格式把state和action return
//   return {
//     userInfo,
//     getUserInfo,
//     clearUserInfo
//   }
// }, {
//   persist: true
// });
