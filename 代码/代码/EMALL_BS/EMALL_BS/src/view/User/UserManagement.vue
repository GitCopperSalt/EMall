<template>
  <!-- 内容区域 -->
  <el-main>
   
    <el-table :data="users" style="width: 100%" border stripe>
      <el-table-column prop="userId" label="用户ID" width="100"></el-table-column>
      <el-table-column prop="username" label="昵称" width="150"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="150">
        <template #default="{ row }">
          <img :src="row.avatar" alt="头像" style="width: 50px; height: 50px;" v-if="row.avatar">
        </template>
      </el-table-column>
      
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusTag(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
     
    </el-table>

  </el-main>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios'; // 引入 axios

const router = useRouter();

const handleCommand = (command: string) => {
  if (command === 'out') {
    router.push('/');
  } else if (command === 'changebasicinformation') {
    router.push('/changebasicinformation');
  }
};

const users = ref([]);

const dialogVisible = ref(false);
const dialogTitle = ref('添加用户');
const userForm = ref({
  userId: 0,
  username: '',
  avatar: '',
  createtime: '',
  status: 'active',
  address: ''
});

const openAddDialog = () => {
  userForm.value = {
    userId: 0,
    username: '',
    avatar: '',
    createtime: getRandomDate(),
    status: getRandomStatus(),
    address: ''
  };
  dialogTitle.value = '添加用户';
  dialogVisible.value = true;
};

const openEditDialog = (row) => {
  userForm.value = { ...row };
  dialogTitle.value = '编辑用户';
  dialogVisible.value = true;
};

const saveUser = () => {
  if (userForm.value.userId) {
    // 更新用户
    const index = users.value.findIndex(item => item.userId === userForm.value.userId);
    if (index !== -1) {
      users.value.splice(index, 1, { ...userForm.value });
      ElMessage.success('用户更新成功');
    }
  } else {
    // 添加用户
    userForm.value.userId = users.value.length + 1; // 简单的ID生成方式
    users.value.push({ ...userForm.value });
    ElMessage.success('用户添加成功');
  }
  dialogVisible.value = false;
};

function statusTag(status) {
  const types = {
    'active': 'success',
    'inactive': 'info'
  };
  return types[status] || 'info';
}

function getStatusText(status) {
  const texts = {
    'active': '活跃',
    'inactive': '不活跃'
  };
  return texts[status] || '未知状态';
}

function getRandomDate() {
  const now = new Date();
  const randomTime = now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 365 * 5; // 随机生成过去5年内的日期
  return new Date(randomTime).toISOString().slice(0, 19).replace('T', ' ');
}

function getRandomStatus() {
  return Math.random() > 0.5 ? 'active' : 'inactive';
}

// 从后端获取用户信息
const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/user/info'); // 替换为你的后端API地址
    if (response.data.status === 'success') {
      users.value = response.data.data;
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    ElMessage.error('获取用户信息失败');
  }
};

// 在组件挂载时获取用户信息
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.layout-container-demo .header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  text-align: right;
  font-size: 16px;
  padding: 0 20px;
}

.layout-container-demo .toolbar {
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

/* 取消表格的外边框 */
.el-table--border {
  border: none !important;
}

/* 取消表格单元格的边框 */
.el-table th,
.el-table td {
  border: none !important;
}

/* 取消表格单元格伪元素生成的边框 */
.el-table--border .el-table__inner-wrapper:after,
.el-table--border:after,
.el-table--border:before,
.el-table__inner-wrapper:before {
  background-color: transparent !important;
  /* 使边框背景透明 */
  content: none !important;
  /* 移除伪元素内容 */
  display: none !important;
  /* 隐藏伪元素 */
}
</style>
