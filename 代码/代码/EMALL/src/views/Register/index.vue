<template>
  <div class="main-container">
    <header>
      <img src="@/resources/img/logo.jpg" alt="Logo" class="logo" @click="$router.push('/')">
    </header>
    <div class="content">
      <nav class="nav">
        <button :class="{ active: registrationType === 'phone' }" @click="setRegistrationType('phone')">手机号码注册</button>
        <button :class="{ active: registrationType === 'email' }" @click="setRegistrationType('email')">邮箱地址注册</button>
      </nav>
      <div class="register-form">
        <h1 style="text-align: center; /* 使内容居中 */">乐享账号注册</h1>
        <div class="login-prompt" style="text-align: center; /* 使内容居中 */">
          <p>已有账号，<a href="#" @click="goToLogin">去登录&gt;</a></p>
        </div>
        <div class="form-group">
          <label v-if="registrationType === 'phone'" for="country">国家/地区： 中国</label>
          <label v-if="registrationType === 'email'" for="country">国家/地区： 中国</label>
        </div>
        <div class="form-group">
          <input type="text" :value="registrationType === 'phone' ? phone : email"
            @input="updateInput($event.target.value)"
            :placeholder="registrationType === 'phone' ? '+86(中国) 手机号' : '邮箱地址'" maxlength="50">
          <p v-if="registrationType === 'phone' ? phoneError : emailError" class="error">
            {{ registrationType === 'phone' ? phoneError : emailError }}
          </p>
        </div>
        <div class="form-group" v-if="registrationType === 'phone'">
          <div class="verification-wrapper">
            <input type="text" v-model="code" placeholder="短信验证码">
            <button @click="getCode" class="get-code-btn" :class="{ active: isPhoneValid, inactive: !isPhoneValid }"
              :disabled="!isPhoneValid">
              获取验证码
            </button>
          </div>
        </div>
        <div class="form-group" v-if="registrationType === 'email'">
          <div class="verification-wrapper">
            <input type="text" v-model="emailCode" placeholder="邮箱验证码">
            <button @click="getCode" class="get-code-btn" :class="{ active: isEmailValid, inactive: !isEmailValid }"
              :disabled="!isEmailValid">
              获取验证码
            </button>
          </div>
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="密码" @blur="validatePassword">
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>
        <div class="form-group">
          <input type="password" v-model="confirmPassword" placeholder="确认密码" @blur="validateConfirmPassword">
          <p v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</p>
        </div>
        <div class="form-group">
          <input type="date" v-model="birthdate">
        </div>
        <button class="register-btn" :style="{ backgroundColor: isFormValid ? '#CA141D' : '#ffcccc' }" @click="register">
          注册
        </button>
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
export default {
  data() {
  return {
    registrationType: 'phone', // 默认注册方式为手机号码
    phone: '',
    email: '',
    code: '',
    
    emailCode: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    phoneError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    formIsValid: false, // 新增的默认值属性
  };
},
  computed: {
  isPhoneValid() {
    return this.phone.length === 11; // 检查手机号是否为11位
  },
  isEmailValid() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.email);
  },
  isFormValid() {
    // 移除对自身的依赖，根据输入状态进行动态判断
    return (this.registrationType === 'phone' ? !this.phoneError : !this.emailError) &&
      !this.passwordError &&
      !this.confirmPasswordError;
  },
},
methods: {
  goToLogin() {
    this.$router.push('/login'); // 跳转到登录页面
  },
  setRegistrationType(type) {
    this.registrationType = type;
    this.phone = ''; // 清空手机号码输入
    this.email = ''; // 清空邮箱输入
    this.code = ''; // 清空验证码输入
    this.emailCode = ''; // 清空邮箱验证码输入
    this.password = ''; // 清空密码输入
    this.confirmPassword = ''; // 清空确认密码输入
    this.phoneError = ''; // 清空手机错误信息
    this.emailError = ''; // 清空邮箱错误信息
    this.passwordError = ''; // 清空密码错误信息
    this.confirmPasswordError = ''; // 清空确认密码错误信息
  },
  updateInput(value) {
    if (this.registrationType === 'phone') {
      this.phone = value.replace(/\D/g, ''); // 只允许输入数字
      this.validatePhone();
    } else {
      this.email = value;
      this.validateEmail();
    }
  },
  validatePhone() {
    this.phoneError = this.phone.length !== 11 ? '手机号必须为11位数字' : '';
  },
  validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailPattern.test(this.email) ? '邮箱格式不正确' : '';
  },
  validatePassword() {
    this.passwordError = this.password.length < 8 ? '密码必须至少包含8个字符' : '';
  },
  validateConfirmPassword() {
    this.confirmPasswordError = this.password !== this.confirmPassword ? '确认密码不匹配' : '';
  },
  getCode() {
    if (this.registrationType === 'phone' && !this.isPhoneValid) return;
    if (this.registrationType === 'email' && !this.isEmailValid) return;
    alert('验证码已发送到您的' + (this.registrationType === 'phone' ? '手机' : '邮箱') + '！');
  },
  async register() {
    if (this.phoneError || this.emailError || this.passwordError || this.confirmPasswordError) {
      alert('请修正输入的错误！');
      this.formIsValid = false; // 确保设置为 false
      return;
    }
    
    this.formIsValid = true; // 设置为 true 表示表单有效
    
    // 准备要发送的数据
    const userData = {
      username: this.registrationType === 'phone' ? this.phone : this.email,
      password: this.password,
      phone: this.registrationType === 'phone' ? this.phone : null,
      email: this.registrationType === 'email' ? this.email : null, // 如果是手机号注册，邮箱为 null
    };

    // 发起请求
    try {
      const response = await axios.post('http://47.108.198.12/api/user/createUser', userData);
      alert(`注册成功！${this.registrationType === 'phone' ? '手机号：' + this.phone : '邮箱：' + this.email}`);
      
      // 跳转到 /login 页
      this.$router.push('/login');
    } catch (error) {
      alert(`注册失败：${error.response.data.message || '未知错误'}`);
    }
  },
},
}

</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  background-color: #f5f5f5;
}

header {
  width: 100%;
  background: #fff;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.logo {
  height: 60px;
}

.content {
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.login-prompt {
  margin-top: 10px; /* 为提示文本添加上边距 */
}

.login-prompt p {
  font-size: 16px; /* 设置字体大小 */
  display: inline-block; /* 使文本块水平居中 */
}

.login-prompt a {
  color: blue; /* 设置链接颜色 */
  text-decoration: underline; /* 设置下划线 */
}
nav {
  display: flex;
  flex-direction: column;
  margin-right: 40px;
}

nav button {
  background: #eee;
  border: none;
  padding: 10px 20px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
}

nav button.active {
  background: #fff;
  font-weight: bold;
}

.register-form {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-group {
  margin-bottom: 15px;
  position: relative;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  /* 去除边框 */
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  font-size: 14px;
  outline: none;
}

.verification-wrapper {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 8px;
}

.get-code-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  text-decoration: none; /* 去掉下划线 */
}

.get-code-btn.active {
  color: blue;
}

.get-code-btn.inactive {
  color: lightblue;
  cursor: not-allowed;
}

.register-btn {
  width: 100%;
  padding: 12px;
  color: white; /* 字体颜色为白色 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  background-color: #ffcccc; /* 默认颜色为浅红色 */
}

.register-btn:hover {
  background-color: #d0d0d0; /* 悬停效果 */
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.footer {
  width: 100%;
  text-align: center;
  background: #f5f5f5;
  padding: 10px 0; /* 增加内边距 */
  font-size: 1em; /* 增加字体大小 */
  color: gray;
  border-top: 1px solid #ddd;
}
</style>
