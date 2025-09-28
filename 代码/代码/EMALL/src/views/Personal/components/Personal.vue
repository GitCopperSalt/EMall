<template>
  <div class="user-profile">
    <header class="header">
      <h4><router-link to="/">首页</router-link> > 我的商城</h4>
    </header>

    <div class="profile-card">
      <img src="#"  @click="$router.push('/userCenter')" alt="User Avatar" class="avatar" />
      <div class="info">
       <h2 @click="$router.push('/userCenter')">{{ user.username }}</h2>
       
        <div class="stats">
          <span class="stat"><strong>0</strong> 积分</span>
          <span class="stat"><strong>0</strong> 优惠券</span>
          <span class="stat"><strong>0</strong> 代金券</span>
        </div>
        <router-link to="" class="link">收货地址</router-link>
      </div>
    </div>

    <section class="my-orders">
    
      <div class="orders-card">
        <h2>我的订单</h2>
        <div class="footer-links">
          
          <router-link to="/myorder" class="footer-link">全部订单</router-link>
        </div>
        <div class="orders-grid">
          <div class="order-item">
            <router-link :to="{ path: '/myorder', query: { status: 'pending' } }">
            <svg width="32" height="32" viewBox="0 0 1024 1024">
              <path d="M810.667 683.733c0 53.608-43.458 97.067-97.067 97.067v0h-403.2c-53.608 0-97.067-43.458-97.067-97.067v0-343.467c0-53.608 43.458-97.067 97.067-97.067v0h403.2c53.608 0 97.067 43.458 97.067 97.067v0zM765.858 410.65h-153.6l0.009 145.526c0 15.395-11.648 28.070-26.612 29.692l-3.254 0.175c-7.121 0-14.007-2.545-19.418-7.174v0l-50.982-43.623-50.982 43.623c-11.697 10.009-28.901 9.399-39.862-0.916v0l-2.249-2.359c-4.63-5.41-7.174-12.297-7.174-19.418v0-145.526h-153.6v273.084c0 27.554 21.322 50.128 48.366 52.123l3.901 0.143h403.2c28.866 0 52.267-23.401 52.267-52.267v0l-0.009-273.084zM567.45 413.85h-110.925v109.875l36.057-30.828c10.318-8.829 25.153-9.508 36.167-2.038v0l2.669 2.038 36.032 30.828v-109.875zM713.6 288h-403.2c-28.866 0-52.267 23.401-52.267 52.267v0 25.583h507.725l0.009-25.583c0-27.554-21.322-50.128-48.366-52.123l-3.901-0.143z" fill="#000000"></path>
            </svg>
            <p>待付款</p>
          </router-link>
          </div>
          <div class="order-item">
            <router-link :to="{ path: '/myorder', query: { status: 'toReceive' } }">
            <svg width="32" height="32" viewBox="0 0 1024 1024">
              <path d="M633.067 246.4c128.13 0 232 103.87 232 232 0 126.849-101.803 229.92-228.163 231.969l-3.837 0.031h-52.262l-116.933 116.938c-8.698 8.698-22.583 9.046-31.696 1.044l-1.114-1.044c-8.698-8.698-9.046-22.583-1.044-31.696l1.044-1.114 123.733-123.733c3.988-3.988 9.279-6.375 14.873-6.745l1.532-0.051h61.867c102.504 0 185.6-83.096 185.6-185.6 0-101.479-81.442-183.936-182.531-185.575l-3.069-0.025h-216.533c-102.504 0-185.6 83.096-185.6 185.6 0 101.479 81.442 183.936 182.531 185.575l3.069 0.025h23.2c12.813 0 23.2 10.387 23.2 23.2 0 12.355-9.658 22.455-21.837 23.161l-1.363 0.039h-23.2c-128.13 0-232-103.87-232-232 0-126.849 101.803-229.92 228.163-231.969l3.837-0.031h216.533zM370.133 439.733c21.355 0 38.667 17.312 38.667 38.667s-17.312 38.667-38.667 38.667c-21.355 0-38.667-17.312-38.667-38.667s17.312-38.667 38.667-38.667zM524.8 439.733c21.355 0 38.667 17.312 38.667 38.667s-17.312 38.667-38.667 38.667c-21.355 0-38.667-17.312-38.667-38.667s17.312-38.667 38.667-38.667zM679.467 439.733c21.355 0 38.667 17.312 38.667 38.667s-17.312 38.667-38.667 38.667c-21.355 0-38.667-17.312-38.667-38.667s17.312-38.667 38.667-38.667z" fill="#000000"></path>
            </svg>
            <p>待收货</p>
          </router-link>
          </div>
          <div class="order-item">
            <router-link :to="{ path: '/refund', query: { status: 'completed' } }">
            <svg width="32" height="32" viewBox="0 0 1024 1024">
              <path d="M512 204.8c169.662 0 307.2 137.538 307.2 307.2 0 9.54-0.435 19.027-1.3 28.44-2.443 26.631-8.286 52.276-17.090 76.5v0l-0.783 1.698c-0.92 1.621-2.235 2.996-3.836 3.988-5.25 3.254-12.143 1.635-15.397-3.615v0l-53.107-85.692c-1.369-2.209-2.095-4.757-2.095-7.356 0-7.712 6.252-13.964 13.964-13.964v0h37.755c0-146.526-118.783-265.309-265.309-265.309-18.908 0-37.547 1.975-55.713 5.855-121.406 25.934-209.596 133.694-209.596 259.454 0 146.526 118.783 265.309 265.309 265.309 26.37 0 52.202-3.841 76.92-11.316 36.475-11.030 70.060-29.844 98.575-55.014 8.672-7.655 21.909-6.831 29.564 1.842s6.831 21.909-1.842 29.564c-33.006 29.134-71.902 50.924-114.171 63.706-28.64 8.661-58.556 13.109-89.045 13.109-169.662 0-307.2-137.538-307.2-307.2 0-145.623 102.099-270.379 242.736-300.421 21.038-4.494 42.61-6.779 64.464-6.779zM603.173 380.123c8.813 7.137 10.793 19.584 5.065 29.014l-1.754 2.491-51.481 63.547 34.098 0.025c10.45 0 19.074 8.545 20.339 19.59l0.16 2.81c0 11.42-7.82 20.843-17.927 22.225l-2.571 0.175-58.315-0.025v41.6l58.301 0.025c10.458 0 19.087 8.545 20.353 19.59l0.16 2.81c0 11.42-7.825 20.843-17.94 22.225l-2.573 0.175-58.301-0.025 0.014 33.114c0 10.252-8.545 18.713-19.59 19.954l-2.81 0.157c-11.42 0-20.843-7.672-22.225-17.588l-0.175-2.523-0.014-33.114-60.673 0.025c-10.458 0-19.087-8.545-20.353-19.59l-0.16-2.81c0-11.42 7.825-20.843 17.94-22.225l2.573-0.175 60.673-0.025v-41.6l-60.687 0.025c-10.45 0-19.074-8.545-20.339-19.59l-0.16-2.81c0-11.42 7.82-20.843 17.927-22.225l2.571-0.175 35.010-0.025-51.455-63.547c-7.785-9.614-6.303-23.719 3.311-31.505s23.719-6.303 31.505 3.311l63.974 79.043 64.025-79.043c7.785-9.614 21.891-11.097 31.505-3.311z" fill="#000000"></path>
            </svg>
            <p>退款</p>
          </router-link>
          </div>
          <div class="order-item">
            <router-link :to="{ path: '/myorder', query: { status: 'cancelled' } }">
            <svg width="32" height="32" viewBox="0 0 1024 1024">
              <path d="M706.909 243.2c65.551 0 118.691 53.487 118.691 119.467l0.014 47.467c18.155 3.053 31.986 18.844 31.986 37.867v128c0 19.022-13.832 34.814-31.986 37.867l-0.014 47.467c0 65.98-53.14 119.467-118.691 119.467h-415.418c-65.551 0-118.691-53.487-118.691-119.467v-298.667c0-65.98 53.14-119.467 118.691-119.467h415.418zM706.909 288h-415.418c-40.275 0-73.054 32.306-74.153 72.577l-0.028 2.090v298.667c0 40.538 32.096 73.531 72.105 74.638l2.076 0.029h415.418c40.275 0 73.054-32.306 74.153-72.577l0.028-2.090-0.009-46.933h-147.482c-56.554 0-102.4-45.846-102.4-102.4s45.846-102.4 102.4-102.4h147.482l0.009-46.933c0-40.538-32.096-73.531-72.105-74.638l-2.076-0.029zM812.8 454.4h-179.2c-30.486 0-55.441 23.684-57.467 53.656l-0.133 3.944c0 30.486 23.684 55.441 53.656 57.467l3.944 0.133h179.2v-115.2zM633.6 486.4c14.138 0 25.6 11.462 25.6 25.6s-11.462 25.6-25.6 25.6c-14.138 0-25.6-11.462-25.6-25.6s11.462-25.6 25.6-25.6z" fill="#000000"></path>
            </svg>
            <p>已取消</p>
          </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'; // 引入持久化存储逻辑
import { useRouter } from 'vue-router';
import axios from 'axios'; // 引入 axios

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    // 定义一个异步函数来获取用户信息
    const fetchUserInfo = async (username) => {
      try {
        const response = await axios.get(`/api/user/${username}`); // 假设后端 API 是这个路径
        userStore.setUserInfo(response.data); // 假设 userStore 有一个 setUserInfo 方法来更新信息
      } catch (error) {
        console.error('获取用户信息失败', error);
        router.push('/login'); // 如果获取失败，重定向到登录页面
      }
    };

    // 如果没有用户信息，尝试从后端获取
    if (!userStore.userInfo) {
      const username = localStorage.getItem('username'); // 假设用户名存储在 localStorage 中
      if (username) {
        fetchUserInfo(username);
      } else {
        router.push('/login'); // 如果没有用户名，重定向到登录页面
      }
      return;
    }

    const user = userStore.userInfo; // 从持久化存储中获取用户信息

    return { user };
  },
};

</script>
<style scoped>
.user-profile {
  max-width: 100%;
  margin: 0 auto;
  padding: 18px 100px; /* 减小了 padding */
}

.header {
  margin-bottom: 12px; 
  font-size: 16px; 
}

.profile-card {
  height: 100px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 12px; /* 减小了 padding */
  border-radius: 4.5px; /* 减小了 border-radius */
  box-shadow: 0 1.125px 4.5px rgba(0, 0, 0, 0.1); /* 减小了 box-shadow */
}

.avatar {
  border-radius: 50%;
  width: 40px; /* 减小了 width */
  height: 40px; /* 减小了 height */
  margin-right: 9px; /* 减小了 margin-right */
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

.avatar:hover {
  transform: scale(1.1);
  background-color: rgba(0, 0, 0, 0.05);
}

.info {
  flex-grow: -1;
}

.info h2 {
  font-size: 16px; /* 减小了 font-size */
  transition: color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.info h2:hover {
  color: #007bff;
  transform: scale(1.05);
}

.stats {
  display: flex;
  gap: 16.875px; /* 减小了 gap */
  margin: 5.625px 0; /* 减小了 margin */
}

.stat {
  font-size: 12px; /* 减小了 font-size */
  cursor: pointer;
}

.link {
  color: #007bff;
  text-decoration: noneunderline;
  font-size: 12px; /* 减小了 font-size */
}

.my-orders {
  margin-top: 11.25px; /* 减小了 margin-top */
}

.orders-card {
  height: 160px;
  background-color: white;
  padding: 9px; /* 减小了 padding */
  border-radius: 4.5px; /* 减小了 border-radius */
  box-shadow: 0 1.125px 3px rgba(0, 0, 0, 0.1); /* 减小了 box-shadow */
}

.footer-links {
  text-align: right;
  margin-bottom: 9px; /* 减小了 margin-bottom */
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 9px; /* 减小了 gap */
}

.order-item {
  text-align: center;
}

.footer-link {
  color: #007bff;
}
</style>