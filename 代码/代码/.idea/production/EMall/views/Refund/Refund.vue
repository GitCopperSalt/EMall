<template>
  <div class="page-header">
    <h1>我的退款</h1>
    <hr class="divider" />
  </div>
  <div class="order-tabs">
    <button @click="showRecentSixMonths = true; showBeforeSixMonths = false"
      :class="{ 'active': showRecentSixMonths }">最近六个月</button>
    <button @click="showRecentSixMonths = false; showBeforeSixMonths = true"
      :class="{ 'active': showBeforeSixMonths }">六个月以前</button>
  </div>
  <div>
    <table v-if="filteredRecords.length > 0" class="order-list">
      <thead>
        <tr>
          <th>订单号</th>
          <th>商品图片</th>
          <th>商品名</th>
          <th>申请退款时间</th>
          <th>退款金额</th>
          <th>退款状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredRecords" :key="record.orderNumber" class="record-item">
          <td>{{ record.orderNumber }}</td>
          <td>
            <img :src="record.image" alt="商品图片" class="product-image">
          </td>
          <td>{{ record.productName }}</td>
          <td>{{ new Date(record.date.replace(' ', 'T')).toLocaleString() }}</td>
          <td>{{ record.payment }}</td>
          <td>{{ statusMap[record.status] || record.status }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>您暂时没有相关记录。</p>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore'; // 导入 userStore

export default {
  setup() {
    const showRecentSixMonths = ref(true);
    const showBeforeSixMonths = ref(false);

    // 获取 userStore 实例
    const userStore = useUserStore();

    // 定义状态映射对象
    const statusMap = {
      'refund': '退货中',
      // 其他状态的映射
      'pending': '处理中',
      'toReceive': '待收货',
      'cancelled': '已取消',
      'afterSales': '售后服务'
    };

    // 获取当前日期
    const currentDate = new Date();

    // 计算六个月前的日期
    const sixMonthsAgoDate = new Date();
    sixMonthsAgoDate.setMonth(currentDate.getMonth() - 6);

    // 筛选最近六个月记录的方法
    const filterRecentSixMonths = () => {
      return refundRecords.value.filter(record => {
        const recordDate = new Date(record.date.replace(' ', 'T')); // 将空格替换为 T
        return recordDate >= sixMonthsAgoDate;
      });
    };

    // 筛选六个月以前记录的方法
    const filterBeforeSixMonths = () => {
      return refundRecords.value.filter(record => {
        const recordDate = new Date(record.date.replace(' ', 'T')); // 将空格替换为 T
        return recordDate < sixMonthsAgoDate;
      });
    };

    // 根据按钮状态返回要显示的筛选后的数据
    const filteredRecords = ref([]);
    watch([showRecentSixMonths, showBeforeSixMonths], () => {
      console.log('watch triggered', showRecentSixMonths.value, showBeforeSixMonths.value);
      if (showRecentSixMonths.value) {
        filteredRecords.value = filterRecentSixMonths();
      } else if (showBeforeSixMonths.value) {
        filteredRecords.value = filterBeforeSixMonths();
      }
    });

    // 初始化时筛选最近六个月的记录
    const refundRecords = ref([]);
    onMounted(() => {
      console.log('onMounted called');
      fetchOrders();
    });

    // 获取订单数据的函数
    const fetchOrders = async () => {
      try {
        const username = userStore.userInfo?.username; // 从userStore中获取username
        if (!username) {
          console.error('用户名未定义');
          return;
        }
        console.log('Fetching orders for username:', username);
        const response = await axios.get('http://localhost:8080/api/orders', {
          params: { 
            username,
            status: 'refund' // 添加状态参数来过滤退款订单
          } 
        }); // 替换为你的后端API地址
        console.log('Orders fetched successfully:', response.data);
        refundRecords.value = response.data.filter(record => record.status === 'refund'); // 前端再次过滤确保只留下status为refund的数据
        console.log('Refund records:', refundRecords.value);
        filteredRecords.value = filterRecentSixMonths();
        console.log('Filtered records:', filteredRecords.value);
        if (filteredRecords.value.length === 0) {
          console.warn('No refund records found');
        }
        showRecentSixMonths.value = true; // 手动触发watch回调
      } catch (error) {
        console.error('获取订单数据失败:', error);
      }
    };

    return {
      showRecentSixMonths,
      showBeforeSixMonths,
      filteredRecords,
      statusMap // 添加状态映射对象到返回值
    };
  }
};
</script>

<style scoped>
.record-item {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
}

button {
  padding: 10px 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:active {
  background-color: black;
  color: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
}

.product-image {
  width: 150px;
  margin-right: 20px;
  object-fit: cover;
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
  vertical-align: middle;
}

.order-list th {
  background-color: #f2f2f2;
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
</style>
