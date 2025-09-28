<script setup>
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import LayoutFloat from "./components/LayoutFloat.vue";
</script>

<template >
  <!-- 顶吸组件 -->
  <LayoutFixed></LayoutFixed>
  <!-- 顶部导航 -->
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <!-- home内容 -->
   <div class="home-content">
    <RouterView/>
   </div>
 <!-- 返回顶部 -->
<LayoutFloat></LayoutFloat>
  <LayoutFooter></LayoutFooter>

</template>

<style scoped>
.home-content {
  align-items:center;
}
</style>