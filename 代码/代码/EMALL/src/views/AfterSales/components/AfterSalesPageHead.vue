<template>
  <div class="page-header">
    <header>
      <h1>我的售后</h1>
      <hr class="divider" />
    </header>
  </div>
  <div class="order-tabs">
    <button
      @click="navigateTo('action')"
      :class="{ active: activeButton === 'action' }"
    >
      售后申请
    </button>
    <button
      @click="navigateTo('record')"
      :class="{ active: activeButton === 'record' }"
    >
      售后申请记录
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeButton: ''
    };
  },
  mounted() {
    // 默认激活“售后申请”按钮并跳转
    this.navigateTo('action');
  },
  methods: {
    setActiveButton(buttonType) {
      this.activeButton = buttonType;
    },
    navigateTo(buttonType) {
      // 设置激活的按钮样式
      this.setActiveButton(buttonType);

      // 根据按钮类型导航到不同的路由
      if (buttonType === 'action') {
        this.$router.push('/afterSalesView/application');
      } else if (buttonType === 'record') {
        this.$router.push('/afterSalesView/record');
      }
    }
  }
}
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}

.order-container {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  min-height: 600px;
}

.sidebar {
  width: 200px;
  border-right: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
}

.sidebar h3 {
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 5px 0; /* 调整间距，减少上下间距 */
}

.sidebar-link {
  text-decoration: none;
  color: inherit;
  display: block; /* 设置为块级元素，使整个区域可点击 */
  padding: 5px 0; /* 调整内边距，增加点击区域但不影响整体高度 */
}

.content {
  margin-left: 20px;
  padding: 20px;
  flex-grow: 1;
}

.order-tabs {
  display: flex;
  margin-bottom: 10px;
}

.order-tabs button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.order-tabs button.active {
  background-color: black;
  color: white;
}

.order-period {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
}

.divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
}

.order-list {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-list th,
.order-list td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  /* 文字水平居中 */
  vertical-align: middle;
  /* 垂直居中 */
}

.order-list th {
  background-color: #f2f2f2;
}

.product-info {
  display: flex;
  align-items: center;
}

img {
  width: 150px;
  margin-right: 10px;
}

.product-details {
  text-align: left;
  /* 文字左对齐 */
}

.order-actions a {
  margin-right: 10px;
  text-decoration: none;
  color: blue;
  cursor: pointer;
  /* 添加鼠标指针样式 */
}


.tabs-container {
  display: flex;
  justify-content: left-start;
  margin-bottom: 0;
  margin-left: 20px;
}
.tabs-container button {
  padding: 8px 10px;
  border: 1px solid #ffffff;
  border-bottom: none;
  cursor: pointer;
  background-color: #ffffff;
  margin-right: 15px;
  font-size: 20px;
  font-weight: bold;
  transition: all 0.3s ease;
}
</style>