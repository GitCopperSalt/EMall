<template>
  <el-header class="header">
    <div class="toolbar">
      <span class="company-name">乐享商城EMALL后台系统</span>
      <el-dropdown @command="handleCommand">
        <el-icon class="settings-icon">
          <setting />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
          
            <el-dropdown-item command="out">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="username">{{ username }}</span>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Setting } from '@element-plus/icons-vue';

const router = useRouter();

// 从 localStorage 中获取用户名
const username = ref(localStorage.getItem('username'));

if (!username.value) {
  console.error('用户名未找到');
  router.push('/'); // 如果没有找到用户名，重定向到登录页面
}

const handleCommand = (command: string) => {
  if (command === 'out') {
    localStorage.removeItem('username'); // 清除用户名
    router.push('/');
  } else if (command === 'changebasicinformation') {
    router.push('/changebasicinformation');
  }
};
</script>

<style scoped>
.header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  text-align: right;
  font-size: 16px;
  padding: 0 20px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.company-name {
  font-size: 20px;
  margin-right: auto;
}

.settings-icon {
  margin-right: 8px;
  margin-top: 1px;
}

.username {
  margin-left: 8px;
}
</style>
