<template>
  <el-menu :default-openeds="openIndexes" unique-opened @open="handleOpen">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>基本信息
      </template>
      <el-menu-item-group>
        <template #title>个人信息</template>
        <el-menu-item index="1-1" @click="navigateTo('/index')">基本信息</el-menu-item>
        <el-menu-item index="1-2" @click="navigateTo('/change-account')">修改账号</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><message /></el-icon>车辆信息
      </template>
      <el-menu-item-group>
        <template #title>车辆查询</template>
        <el-menu-item index="2-1" @click="navigateTo('/car-info')">车辆基本信息</el-menu-item>
        <el-menu-item index="2-2" @click="navigateTo('/car-state')">申请状态</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><Menu /></el-icon>公车申请
      </template>
      <el-menu-item-group>
        <template #title>申请操作</template>
        <el-menu-item index="3-1" @click="navigateTo('/car-apply')">车辆申请</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="4" v-if="user.userRole === 'admin'">
      <template #title>
        <el-icon>
          <operation />
        </el-icon>车辆操作
      </template>
      <el-menu-item-group>
        <template #title>车辆管理</template>
        <el-menu-item index="4-1" @click="navigateTo('/car-edit')">车辆信息编辑</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>


    <el-sub-menu index="5" v-if="user.userRole === 'admin'">
      <template #title>
        <el-icon><List /></el-icon>审核操作
      </template>
      <el-menu-item-group>
        <template #title>审核管理</template>
        <el-menu-item index="5-1" @click="navigateTo('/car-audit')">审核申请信息</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>



  </el-menu>
</template>

<script>
export default {
  props: {
    defaultOpens: {
      type: Array,
      default: () => ['1']
    },
    user: {
      type: Object,
      default: () => ({ userRole: 'user' })
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
/* 添加样式 */
.layout-container-demo .el-aside {
  color: var(#1c232f);
  background: var(#1c232f);
}


.layout-container-demo .el-menu {
  border-right: none;
}
</style>
