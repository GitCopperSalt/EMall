<template>
  <div class="main-container">
    <header>
      <img src="@/resources/img/logo.jpg" alt="Logo" class="logo" @click="$router.push('/')">
    </header>
    <div class="content">
      <div class="login-container">
        <div class="login-left">
          <h1 class="bold" style="text-align: center; /* 使内容居中 */">乐享账号登录</h1>
          <h2>输入你的 EMALL ID 和密码</h2>
          <form @submit.prevent="handleSubmit">
            <div class="input-group">
              <label for="EMALLId">EMALL ID</label>
              <input type="text" id="EMALLId" v-model="EMALLId" required :class="{ 'error-input': !isEMALLIdValid }" />
              <p v-if="!isEMALLIdValid" class="error">EMALL ID 不能为空</p>
            </div>
            <div class="input-group">
              <label for="password">密码</label>
              <input type="password" id="password" v-model="password" required :class="{ 'error-input': !isPasswordValid }" />
              <p v-if="!isPasswordValid" class="error">密码不能为空</p>
            </div>
            <button type="submit" :disabled="!isFormValid">登录</button>
          </form>
          <p v-if="showError" class="error">EMALL ID 或密码输入错误，请重试。</p>
        </div>
        <div class="divider"></div> <!-- 竖线分隔符 -->
        <div class="login-right">
          <h2 style="text-align: center; /* 使内容居中 */">没有 EMALL ID</h2>
          <p>继续账户，现在创建 EMALL 账户。</p>
          <button @click="createEMallId">创建 EMALL 账户</button>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div>乐享账号用户协议 | 关于乐享账号与隐私的声明 | 常见问题 </div>
      <div>乐享账号版权所有 © 2011-2024</div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      EMALLId: '',
      password: '',
      showError: false
    };
  },
  computed: {
    isEMALLIdValid() {
      return this.EMALLId.trim() !== '';
    },
    isPasswordValid() {
      return this.password.trim() !== '';
    },
    isFormValid() {
      return this.isEMALLIdValid && this.isPasswordValid;
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:8080/api/user/login', {
          username: this.EMALLId,
          password: this.password
        });

        const { status, message, data } = response.data;

        if (status === 'success') {
          console.log("登录成功", data);
          this.showError = false;
          // 设置用户信息
          this.userStore.setUserInfo({ username: this.EMALLId, token: data });
          // 跳转到首页
          this.$router.push('/');
        } else {
          console.log("登录失败", message);
          this.showError = true;
        }
      } catch (error) {
        console.error("登录过程中发生错误:", error);
        this.showError = true;
      }
    },
    createEMallId() {
      console.log("创建 EMALL 账户");
      this.$router.push('/register'); // 跳转到注册页面
    }
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  }
};
</script>

<style scoped>
/* 全局样式 */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5; /* 背景颜色为浅灰色 */
  margin: 0;
  padding: 0;
  font-size: 16px; /* 根据需要调整全局字体大小 */
}

/* 容器样式 */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 全屏高度 */
  justify-content: center;
}
/* 头部样式 */
header {
  width: 100%;
  background: white;
  padding: 10px 0; /* 减小内边距 */
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.logo {
  height: 80px; /* 减小 Logo 图标高度 */
  cursor: pointer;
}
/* 内容容器 */
.content {
  display: flex;
  width: 100%;
  max-width: 600px; /* 减小最大宽度 */
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 20px; /* 减小外边距 */
}

.login-container {
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 600px; /* 减小最大宽度 */
  margin: auto;
}

/* 登录左侧区域 */
.login-left {
  flex: 1;
  padding: 30px; /* 减小内边距 */
  background: white;
  border-radius: 12px;
}

/* 登录右侧区域 */
.login-right {
  flex: 1;
  padding: 30px; /* 减小内边距 */
  background: white;
  border-radius: 12px;
}

/* 竖线分隔符 */
.divider {
  width: 2px;
  background-color: #ddd;
  height: 100%;
}
/* 表单样式 */
h1 {
  font-size: 28px; /* 减小标题字体 */
  text-align: center;
}

h2 {
  font-size: 20px; /* 减小副标题字体 */
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px; /* 减小输入框之间的间距 */
}

label {
  display: block;
  margin-bottom: 8px; /* 减小标签与输入框之间的间距 */
  font-size: 16px; /* 减小字体 */
}

/* 输入框样式 */
input {
  width: 100%;
  padding: 10px; /* 减小内边距 */
  border: 1px solid #ccc;
  border-radius: 8px; /* 减小圆角 */
  font-size: 16px; /* 保持字体大小 */
}

.error-input {
  border-color: red; /* 错误提示时边框变红 */
}

/* 登录按钮样式 */
button {
  background-color: #CA141D;
  color: white;
  padding: 12px 20px; /* 减小按钮内边距 */
  border: none;
  border-radius: 8px; /* 减小圆角 */
  cursor: pointer;
  font-size: 18px; /* 减小字体 */
  width: 100%; /* 按钮宽度占满输入框宽度 */
}

button:hover {
  background-color: #CA141D;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* 错误提示样式 */
.error {
  color: red;
  font-size: 14px; /* 减小错误提示字体 */
  margin-top: 8px;
}
/* 底部样式 */
.footer {
  width: 100%;
  text-align: center;
  background: #f5f5f5;
  padding: 10px 0; /* 减小底部外边距 */
  font-size: 14px; /* 减小字体 */
  color: gray;
  border-top: 1px solid #ddd;
}
/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    max-width: 100%; /* 全屏宽度 */
  }
  .login-container {
    flex-direction: column; /* 换行显示 */
    max-width: 100%;
  }
  .login-left,
  .login-right {
    max-width: 100%; /* 每个部分占满全屏 */
    padding: 20px; /* 调整内边距 */
  }
  .divider {
    display: none; /* 隐藏分隔符 */
  }
  h1, h2 {
    font-size: 24px; /* 响应式调整字体大小 */
  }
  input {
    font-size: 14px; /* 响应式调整输入框字体 */
  }
  button {
    font-size: 16px; /* 响应式调整按钮字体 */
  }
}

</style>
