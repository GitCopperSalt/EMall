<template>
  <el-form :model="user" label-width="120px" ref="formRef">
    <el-form-item label="用户名">
      <el-input v-model="user.username" placeholder="请输入用户名" disabled></el-input>
    </el-form-item>

    <el-form-item label="旧密码">
      <el-input v-model="oldPassword" type="password" placeholder="请输入旧密码"></el-input>
    </el-form-item>

    <el-form-item label="新密码">
      <el-input v-model="user.password" type="password" placeholder="请输入新密码"></el-input>
    </el-form-item>

    <el-form-item label="确认密码">
      <el-input v-model="confirmPassword" type="password" placeholder="请再次输入密码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitChanges">保存修改</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import axios from 'axios'; // 引入 axios
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus'; // 假设使用 Element Plus 的消息提示组件

const router = useRouter();

const user = ref({
  username: '',
  password: ''
});
const confirmPassword = ref(''); // 确认密码
const oldPassword = ref(''); // 旧密码

onMounted(() => {
  // 从 localStorage 获取 username
  user.value.username = localStorage.getItem('username') || '';
});

const submitChanges = async () => {
  if (user.value.password !== confirmPassword.value) {
    ElMessage.error('两次输入的密码不一致！');
    return;
  }

  try {
    // 发送 PUT 请求到后端 API
    const response = await axios.put('http://localhost:8080/api/admin', {
      username: user.value.username,
      oldPassword: oldPassword.value,
      newPassword: user.value.password
    });
    console.log('密码修改成功:', response.data);
    // 显示成功提示框
    ElMessage.success('密码修改成功');
    // 跳转至主页
    router.push('/index');
  } catch (error) {
    console.error('密码修改失败:', error);
    // 显示错误提示框
    ElMessage.error('密码修改失败，请重试');
  }
};

const resetForm = () => {
  user.value.password = '';
  confirmPassword.value = '';
  oldPassword.value = '';
};
</script>


<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: #1c232f; 
  background: #1c232f; 
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
