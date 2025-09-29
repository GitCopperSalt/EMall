<template>
  
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="stats-container">
          <el-row :gutter="20">
            <el-col :span="8" v-for="stat in stats" :key="stat.title">
              <el-card>
                <div class="stat-item">
                  <i :class="['iconfont', stat.icon]"></i>
                  <div>{{ stat.title }}</div>
                  <div class="stat-number">{{ stat.value }}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="task-row">
      <el-col :span="24">
        <el-card class="task-container">
          <div class="clearfix">
            <span>待处理事务</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="6" v-for="(item, index) in tasks" :key="index">
              <el-card class="task-card" shadow="hover">
                <div class="task-title">{{ item.title }}</div>
                <div class="task-count">({{ item.count }})</div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 商品总览和用户总览卡片 -->
    <el-main class="content-main">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card" shadow="hover">
            <template v-slot:header>
              <span class="card-title">商品总览</span>
            </template>
            <div class="stats-content">
              <div class="stat-item">已下架: <span class="stat-number red-text">{{ productStats.outOfStock }}</span>
              </div>
              <div class="stat-item">已上架: <span class="stat-number green-text">{{ productStats.onSale }}</span>
              </div>
              <div class="stat-item">库存紧张: <span class="stat-number orange-text">{{ productStats.lowStock }}</span>
              </div>
              <div class="stat-item">全部商品: <span class="stat-number">{{ productStats.total }}</span></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" shadow="hover">
            <template v-slot:header>
              <span class="card-title">用户总览</span>
            </template>
            <div class="stats-content">
              <div class="stat-item">今日新增: <span class="stat-number red-text">{{ userStats.today }}</span></div>
              <div class="stat-item">昨日新增: <span class="stat-number green-text">{{ userStats.yesterday }}</span>
              </div>
              <div class="stat-item">本月新增: <span class="stat-number orange-text">{{ userStats.thisMonth }}</span>
              </div>
              <div class="stat-item">会员总数: <span class="stat-number">{{ userStats.totalMembers }}</span></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
</template>

<script  setup lang="ts">
import { inject, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
// 获取用户信息并添加错误处理
const user = inject('user');
if (!user) {
  console.error('用户信息未找到');
}

const router = useRouter();

// 统计数据
const stats = ref([
  { title: '今日订单总数', value: 8, icon: 'icon-order' },
  { title: '今日销售总额', value: '¥ 43620.00', icon: 'icon-sales' },
  { title: '昨日销售总额', value: '¥ 50645.00', icon: 'icon-previous-sales' }
]);

const tasks = ref([
  { title: '待付款订单', count: 9 },
  { title: '已完成订单', count: 5 },

  { title: '待发货订单', count: 6 },
 
  { title: '待处理退款申请', count: 3 },
  { title: '已发货订单', count: 6 },
]);

// 商品统计数据
const productStats = ref({
  outOfStock: 2,
  onSale: 19,
  lowStock: 3,
  total: 22
});

// 用户统计数据
const userStats = ref({
  today: 1,
  yesterday: 2,
  thisMonth: 9,
  totalMembers: 9
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

.content-main {
  padding: 20px;
}

.task-row {
  margin-top: 20px;
}

.box-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.stats-content {
  padding: 13px;
}

.stat-item {
  margin-bottom: 10px;
  font-size: 18px;
}

.stat-number {
  font-weight: bold;
}

.red-text {
  color: red;
}

.green-text {
  color: green;
}

.orange-text {
  color: orange;
}
</style>