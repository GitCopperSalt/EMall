<template>
  <el-container class="layout-container-demo" style="height: 100vh;">
      <!-- 侧边导航栏 -->
      <Sidebar :defaultOpens="['1']" :user="user" />
   
    <el-container>

      <el-header> <!-- 头部区域 -->
        <Header></Header></el-header>
    
    
     <!-- 内容区域 -->
    <el-main class="content-main">
      <RouterView />
     </el-main>
    </el-container>
      </el-container>
   
</template>

<script setup lang="ts">

import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';

</script>

<style scoped>

.content-main {
  padding: 20px;
}

.task-row {
  margin-top: 20px;
}

.box-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.stats-content {
  padding: 13px;
}

.stat-item {
  margin-bottom: 10px;
  font-size: 18px;
}

.stat-number {
  font-weight: bold;
}

.red-text {
  color: red;
}

.green-text {
  color: green;
}

.orange-text {
  color: orange;
}
</style>
