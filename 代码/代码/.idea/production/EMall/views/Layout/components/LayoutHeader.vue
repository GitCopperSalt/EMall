<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const searchQuery = ref('');
const isFocused = ref(false); // 添加一个状态来控制搜索框的焦点

const performSearch = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/name/${searchQuery.value}`);
    const products = response.data;

    const productIds = products.map(product => product.productId);
    // 跳转到搜索页面，并添加时间戳参数
    router.push({ 
      path: '/search', 
      query: { 
        productIds: JSON.stringify(productIds), 
        query: searchQuery.value, 
        timestamp: new Date().getTime() 
      },
      replace: false // 设置为 false 以创建新的历史记录
    });
  } catch (error) {
    console.error('搜索产品失败：', error);
  }
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
};

// 点击事件
const toggleFocus = () => {
  isFocused.value = true;
};

// 失去焦点事件
const handleBlur = () => {
  isFocused.value = false;
};

// 监听路由变化
router.beforeEach((to, from, next) => {
  if (to.path === from.path && JSON.stringify(to.query) === JSON.stringify(from.query)) {
    next({ ...to, query: { ...to.query, timestamp: new Date().getTime() } });
  } else {
    next();
  }
});
</script>

<template>
  <header class='app-header'>
    <div class="container">
      <RouterLink class="logo" to="/" />
      <div class="search" :class="{ 'active': isFocused }" @click="toggleFocus" @blur="handleBlur" tabindex="0">
        <i class="iconfont icon-search"></i>
        <input
          type="text"
          placeholder="搜一搜"
          v-model="searchQuery"
          @keypress="handleKeyPress"
          @focus="toggleFocus"
          @blur="handleBlur"
        />
        <button @click="performSearch">搜索</button>
      </div>
      <!-- 头部购物车 -->
    </div>
  </header>
</template>

<style scoped lang='scss'>
.app-header {
  background: #fff;
  width: 100%;
  position: relative; /* 使其相对于 header 定位 */
  border-bottom: none;
  .container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; /* logo 和搜索框分开对齐 */
  }

  .logo {
    margin-left: 6%;
    margin-right: 2%;
    width: 150px;
    height: 60px;
    background: url("@/resources/img/logo.jpg") no-repeat right 1px;
    background-size: contain;
  }

  .search {
    display: flex;
    align-items: center;
    background: #f1f1f1; /* 背景颜色 */
    border-radius: 25px; /* 圆角效果 */
    padding: 3px; /* 内边距 */
    margin-right: 120px; /* 在右侧添加一些间距 */
    position: absolute; /* 改为绝对定位 */
    right: 20px; /* 初始位置居右 */
    transition: all 0.3s ease; /* 动画效果 */

    &.active {
      top: 50%; /* 垂直居中 */
      left: 50%; /* 水平居中 */
      transform: translate(-50%, -50%); /* 使其完全居中 */
      width: 600px; /* 点击后宽度 */
    }

    .icon-search {
      font-size: 20px;
      padding: 0 10px; /* 图标左右内边距 */
    }

    input {
      border: none;
      outline: none;
      background: transparent; /* 背景透明 */
      padding: 5px; /* 输入框内边距 */
      color: #666;
      width: 150px; /* 输入框宽度 */
      border-radius: 25px; /* 圆角效果 */
      flex: 1; /* 占据剩余空间 */
    }

    button {
      background: linear-gradient(to right, rgb(254, 89, 69), rgb(214, 26, 25));
      color: white;
      border: none;
      border-radius: 25px; /* 圆角效果 */
      cursor: pointer;
      padding: 5px 15px; /* 内边距 */
      transition: background 0.3s;

      &:hover {
        background: linear-gradient(to right, rgb(214, 26, 25), rgb(254, 89, 69));
      }
    }
  }
}
</style>
