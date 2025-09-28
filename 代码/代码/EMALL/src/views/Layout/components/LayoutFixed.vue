<script setup>
import { useScroll } from '@vueuse/core';
import { getCategoryAPI } from '@/apis/layout';


const { y } = useScroll(window);


const categoryListStatic=[
        { id: 1, name: '手机' },
        { id: 2, name: '穿戴' },
        { id: 3, name: '平板' },
        { id: 4, name: '电脑' },
        { id: 5, name: '耳机' },
        { id: 6, name: '家居' },
      ]

</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 52 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <ul  class="app-header-nav" v-show="y > 500">
        <li  v-if="isHomePage" class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li v-if="!isHomePage" class="all-categories">
          <RouterLink to="/">全部分类</RouterLink>
        </li>
        <li v-if="isHomePage" v-for="(category, index) in categoryListStatic" :key="index">
          <RouterLink :active-class="'active'" :to="`/category/${category.id}`">{{ category.name }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isHomePage() {
      return this.$route.path === '/'; // 检查当前路由是否为首页
    }
  }
}
</script>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;

  transform: translateY(-100%);
  opacity: 0;

  &.show {
    transition: all 0s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .logo {
    margin-left: 6%;
    margin-right: 2%;
    width: 200px;
    height: 60px;
    background: url("@/resources/img/logo.jpg") no-repeat right 1px;
    background-size: contain;
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 72px;
    text-align: center;
    list-style: none;

    a {
      font-size: 18px;
      line-height: 32px;
      height: 32px;
      display: flex;
      white-space: nowrap;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>
