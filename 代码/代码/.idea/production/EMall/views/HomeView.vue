<template>

  <el-container class="layout-container-demo">
    <!-- 头部区域 -->
    <el-header style="text-align: right">
      <div width="30%"><span>首页</span> <span>|</span> <span>消费者业务</span> <span>|</span> <span>更多精彩</span></div>

      <div width="30%"><span></span><span>登录</span> <span>|</span> <span>注册</span> <span>|</span> <span>我的订单</span></div>
    </el-header>
   

    <!-- 内容区域 -->
    <el-main>
      <el-scrollbar height="1000px" width="1000px">
<h1>欢迎来到EMALL</h1>
<p>EMALL是一款基于Vue.js的电商系统，旨在为消费者提供便捷的购物体验。</p>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style>

.layout-container-demo .el-header {
  display: flex;
  height: 300px;
  width: 100%;
  justify-content:fit-content;
  align-items: center;
  background-color: #1c1d1c;
  color: #f7f7f7;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo span {
  font-size: 20px;
  margin-right: 2px;
}



</style>