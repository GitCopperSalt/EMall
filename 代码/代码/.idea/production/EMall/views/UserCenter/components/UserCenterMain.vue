<template>
  <div class="account-security">
    <nav class="sidebar">
      <div class="profile">
        <img src="#" alt="Profile Picture" class="profile-pic" />
        
        <p>乐享帐号：13547169328</p>
      </div>
      <ul>
        <li>个人信息</li>
        <li class="active">账户与安全</li>
        <li>实名认证</li>
        <li>儿童帐号</li>
        <li>隐私中心</li>
        <li>付款与账户</li>
      </ul>
    </nav>

    <main class="main-content">
      <h2>账户与安全</h2>
      <div class="account-info">
        <div class="item">
          <span>帐号登录方式</span>
          <span>您可使用手机号、邮件地址或绑定的第三方帐号登录为帐号</span>
        </div>
        <div class="item">
          <span>帐号名</span>
          <span>hejie040701</span>
          <button>修改</button>
        </div>
        <div class="item">
          <span>手机号</span>
          <span>13547169328</span>
          <button>修改</button>
        </div>
        <div class="item">
          <span>邮件地址</span>
          <span>example@example.com</span>
          <button>修改</button>
        </div>
        <div class="item">
          <span>第三方帐号</span>
          <span>绑定的第三方帐号信息</span>
          <button>修改</button>
        </div>
      

      <h3>安全验证</h3>
      <div class="security-verification">
        <div class="verification-item">
          <span>双重验证（未启用）</span>
          <button>开启</button>
        </div>
        <div class="verification-item">
          <span>安全手机号码</span>
          <span>14737125836</span>
          <button>更改</button>
        </div>
        <div class="verification-item">
          <span>安全邮件地址</span>
          <span>example@example.com</span>
          <button>设置</button>
        </div>
      </div>
    </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AccountSecurity",
};
</script>

<style scoped lang='scss'>
.account-security {
  display: flex;
  background: #fff;
  flex-direction: row; /* 保持并排 */
  height: 70vh; /* 填充整个视口高度 */
}

.sidebar {
  margin-left: 200px; /* 在右侧添加一些间距 */
  width: 250px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center; /* 侧边栏居中 */
  padding: 20px;
}

.profile {
  text-align: center;
  margin-bottom: 20px;
}

.profile-pic {
  width: 80px; /* 调整图片大小 */
  height: 80px;
  border-radius: 50%; /* 圆形头像 */
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%; /* 让列表充满宽度 */
}

.sidebar li {
  padding: 15px;
  cursor: pointer;
  text-align: center; /* 居中对齐 */
}

.sidebar li.active {
  background: #ddd;
  font-weight: bold; /* 高亮显示 */
}

.main-content {
  padding: 20px 30px; /* 增加左右间距 */
  flex: 1;
  margin-right: 200px; /* 在右侧添加一些间距 */
}

.item, .verification-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

button {
  cursor: pointer;
}
</style>
