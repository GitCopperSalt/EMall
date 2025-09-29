<template>
  <el-menu :default-openeds="openIndexes">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>首页
      </template>
      <el-menu-item index="1-1" @click="navigateTo('/instrumentpanel')">仪表盘</el-menu-item>
      <el-menu-item index="1-2" @click="navigateTo('/change-account')">修改账号</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <message />
        </el-icon>商品
      </template>
      <el-menu-item index="2-1" @click="navigateTo('/com-list')">商品列表</el-menu-item>
      <el-menu-item index="2-2" @click="navigateTo('/com-add')">添加商品</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <Menu />
        </el-icon>订单
      </template>
      <el-menu-item index="3-1" @click="navigateTo('/order-list')">订单列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <operation />
        </el-icon>管理
      </template>
      <el-menu-item index="4-1" @click="navigateTo('/user-manage')">用户管理</el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>

<script>
export default {
  props: {
    defaultOpens: {
      type: Array,
      default: () => [] // 将默认值改为空数组
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  data() {
    return {
      openIndexes: this.defaultOpens
    };
  }
};
</script>

<style>
/* 使用更具体的选择器来覆盖默认样式 */
.custom-sidebar {
  background-color: #ADD8E6;
  /* 浅蓝色 */
}

.custom-menu .el-menu-item,
.custom-menu .el-sub-menu__title {
  color: #FFFFFF;
  /* 白色 */
}

.custom-menu .el-menu-item:hover,
.custom-menu .el-sub-menu__title:hover {
  background-color: #0000FF;
  /* 蓝色 */
}

.custom-menu .el-sub-menu .el-menu-item {
  color: #FFFFFF;
  /* 白色 */
}

.custom-menu .el-sub-menu .el-menu-item:hover {
  background-color: #00008B;
  /* 深蓝色 */
}
</style>
