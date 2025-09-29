<template>
  <div class="login-wrapper">
    <div class="header">登录</div>
    <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" status-icon :rules="rules"
      label-width="auto" class="demo-ruleForm">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleLogin">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </el-form-item>

      <span style="color: ">忘记密码</span>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const ruleFormRef = ref();

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
}

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'));
  } else {
    callback();
  }
}

const ruleForm = reactive({
  pass: '',
  username: '',
});

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  username: [{ validator: validateUsername, trigger: 'blur' }],
});

const handleLogin = () => {
  ruleFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      // 发送登录请求
      axios.post('http://localhost:8080/api/admins/login', {
        username: ruleForm.username,
        password: ruleForm.pass,
      })
      .then(response => {
        if (response.data.status === "success") {
          ElMessage.success(response.data.message);
          // 将后端返回的数据持久化到 localStorage
          localStorage.setItem('token', response.data.data);
          localStorage.setItem('username', ruleForm.username);
          // 跳转到首页
          router.push('/index');
        } else {
          ElMessage.error('登录失败，请检查用户名和密码');
        }
      })
      .catch(error => {
        ElMessage.error('登录失败，请稍后再试');
        console.error('登录请求出错:', error);
      });
    } else {
      ElMessage.error('表单验证失败');
      return false;
    }
  });
};

const resetForm = (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style>
body {
  height: 100%;
  
}

.login-wrapper {
  background-color: #fff;
  width: 400px;
  height: 588px;
  border-radius: 15px;
  padding: 50px 50px;
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, 10%);
}

.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
</style>
