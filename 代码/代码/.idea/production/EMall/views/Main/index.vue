<template>
  <div class="order-container">
    <div class="sidebar">
      <h3>订单中心</h3>
      <ul>
        <RouterLink to="#" class="sidebar-link">
          <li><span style="color:#cc0c2d;">我的订单</span></li>
        </RouterLink>

        <RouterLink to="/afterSalesView/application" class="sidebar-link">
          <li>我的售后申请</li>
        </RouterLink>

        <RouterLink to="/refund" class="sidebar-link">
          <li>我的退款</li>
        </RouterLink>

        <RouterLink to="/comment" class="sidebar-link">
          <li>商品评价/追评</li>
        </RouterLink>
      </ul>
      <h3>购买支持</h3>
      <ul>
        <RouterLink to="#" class="sidebar-link">
          <li>收货地址管理</li>
        </RouterLink>
      </ul>
      <h3>设置</h3>
    </div>
    <div class="content">
      <h1>我的订单</h1>
      <hr class="divider" />
      <div class="order-tabs">
        <button :class="{ active: activeButton === 'all' }" @click="setActiveButton('all')">全部有效订单</button>
        <button :class="{ active: activeButton === 'pending' }" @click="setActiveButton('pending')">待付款</button>
        <button :class="{ active: activeButton === 'toReceive' }" @click="setActiveButton('toReceive')">待收货</button>
        <button :class="{ active: activeButton === 'completed' }" @click="setActiveButton('completed')">已完成</button>
        <button :class="{ active: activeButton === 'cancelled' }" @click="setActiveButton('cancelled')">已取消</button>
      </div>
      <div class="order-period">
        <h2>仅展示近24个月的订单</h2>
      </div>
      <table class="order-list">
        <thead>
          <tr>
            <th>日期</th>
            <th>订单号</th>
            <th>商品</th>
            <th>单价/元</th>
            <th>数量</th>
            <th>状态</th>
            <th>实付款/元</th>
            <th>地址</th>
            <th>电话</th>
            <th>订单状态及操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredOrders" :key="item.orderNumber">
            <td>{{ item.date }}</td>
            <td>{{ item.orderNumber }}</td>
            <td>
              <div class="product-info">
                <img :src="item.image" alt="商品图片" />
                <div class="product-details">
                  <span>{{ item.productName }}</span>
                  <div>
                    <span v-if="item.hasRated">已评价</span>
                    <span v-else>
                      <a href="#" @click.prevent="rateProduct(item.orderNumber)">未评价，点击评价</a>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>¥{{ item.price }}</td>
            <td>{{item.quantity}}</td>
            <td>
              <span v-if="item.status === 'completed'">已完成</span>
              <span v-else-if="item.status === 'pending'">待付款</span>
              <span v-else-if="item.status === 'toReceive'">待收货</span>
              <span v-else-if="item.status === 'cancelled'">已取消</span>
              <span v-else-if="item.status === 'refund'">退款中</span>
              <span v-else-if="item.status === 'afterSales'">售后中</span>
              <span v-else>{{ item.status }}</span>
            </td>
            <td>
              <span v-if="item.status === 'pending'">/</span>
              <span v-else>¥{{ item.payment }} {{ item.paymentMethod }}</span>
            </td>
            <td>{{ item.address }}</td>
            <td>{{ item.phone }}</td>
            <td class="order-actions">
              <a v-if="item.status === 'completed'" href="#" @click.prevent="showAfterSalesDialog(item)">申请售后</a>
              <a v-if="item.status === 'completed'" href="#" @click.prevent="deleteOrder(item.orderNumber)">删除订单</a>
              <a v-if="item.status === 'cancelled'" href="#" @click.prevent="deleteOrder(item.orderNumber)">删除订单</a>
              <a v-if="item.status === 'pending'" href="#" @click.prevent="cancelOrder(item.orderNumber)">取消订单</a>
              <a v-if="item.status === 'pending'" href="#" @click.prevent="modifyOrder(item.orderNumber)">修改订单</a>
              <a v-if="item.status === 'toReceive'" href="#" @click.prevent="requestRefund(item.orderNumber)">申请退款</a>
              <a v-if="item.status === 'toReceive'" href="#" @click.prevent="modifyOrder(item.orderNumber)">修改订单</a>
              <a href="#" @click.prevent="viewOrderDetails(item.orderNumber)">订单详情</a>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 修改订单对话框 -->
      <el-dialog v-model="dialogVisible" title="修改订单">
        <div>
          <label>地址:</label>
          <el-input v-model="selectedOrder.address" placeholder="请输入地址"></el-input>
        </div>
        <div>
          <label>电话:</label>
          <el-input v-model="selectedOrder.phone" placeholder="请输入电话"></el-input>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveModifiedOrder">保存</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 售后申请对话框 -->
      <el-dialog v-model="afterSalesDialogVisible" title="申请售后">
        <div>
          <label>售后原因:</label>
          <el-input v-model="afterSalesReason" placeholder="请输入售后原因"></el-input>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="afterSalesDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitAfterSalesRequest">提交</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios'; // 引入axios
import { useUserStore } from '@/stores/userStore'; // 引入userStore
import { useRoute } from 'vue-router';
import { ElMessage, ElDialog, ElInput, ElButton } from 'element-plus';

const route = useRoute(); // 使用useRoute来获取URL参数
const orders = ref([]); // 初始化为空数组
const userStore = useUserStore(); // 使用userStore
const dialogVisible = ref(false);
const afterSalesDialogVisible = ref(false);
const selectedOrder = ref({});
const afterSalesReason = ref('');

// 获取订单数据的函数
const fetchOrders = async () => {
  try {
    const username = userStore.userInfo?.username; // 从userStore中获取username
    const response = await axios.get('http://localhost:8080/api/orders', {
      params: { username } // 将username作为参数传递给后端
    }); // 替换为你的后端API地址
    orders.value = response.data; // 假设返回的数据结构直接与之前的相同
  } catch (error) {
    console.error('获取订单数据失败:', error);
  }
};

const activeButton = ref(route.query.status || 'all');
// 在组件挂载时调用fetchOrders函数
onMounted(() => {
  fetchOrders();
});
const setActiveButton = (button) => {
  activeButton.value = button;
};

// 计算属性：基于 activeButton 过滤和排序订单
const filteredOrders = computed(() => {
  const currentDate = new Date();
  const twentyFourMonthsAgo = new Date();
  twentyFourMonthsAgo.setMonth(twentyFourMonthsAgo.getMonth() - 24);

  if (activeButton.value === 'all') {
    return orders.value.filter(order => new Date(order.date) >= twentyFourMonthsAgo).sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    return orders.value.filter(order => order.status === activeButton.value && new Date(order.date) >= twentyFourMonthsAgo).sort((a, b) => new Date(b.date) - new Date(a.date));
  }
});

// 评价商品的函数
const rateProduct = (orderNumber) => {
  const order = orders.value.find(order => order.orderNumber === orderNumber);
  if (order) {
    order.hasRated = true; // 设置为已评价
    alert(`您已成功为订单 ${orderNumber} 评价！`);
  }
};

// 取消订单的函数
const cancelOrder = async (orderNumber) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/orders/${orderNumber}`, { status: 'cancelled' });
    if (response.status === 200) {
      const order = orders.value.find(order => order.orderNumber === orderNumber);
      if (order) order.status = 'cancelled';
      ElMessage.success(`订单 ${orderNumber} 已取消！`);
    }
  } catch (error) {
    console.error('取消订单失败:', error);
    ElMessage.error(`取消订单 ${orderNumber} 失败，请重试！`);
  }
};

// 修改订单的函数
const modifyOrder = (orderNumber) => {
  const order = orders.value.find(order => order.orderNumber === orderNumber);
  if (order) {
    selectedOrder.value = { ...order };
    dialogVisible.value = true;
  }
};

// 保存修改后的订单
const saveModifiedOrder = async () => {
  try {
    const response = await axios.put(`http://localhost:8080/api/orders/${selectedOrder.value.orderNumber}`, selectedOrder.value);
    if (response.status === 200) {
      ElMessage.success('订单修改成功');
      // 更新本地数据
      const itemIndex = orders.value.findIndex(item => item.orderNumber === selectedOrder.value.orderNumber);
      if (itemIndex !== -1) {
        orders.value[itemIndex] = { ...selectedOrder.value };
      }
      dialogVisible.value = false;
    }
  } catch (error) {
    console.error('保存修改后的订单失败:', error);
    ElMessage.error('保存修改后的订单失败，请稍后重试');
  }
};

// 申请退款的函数
const requestRefund = async (orderNumber) => {
  try {
    const updateData = { status: 'refund' }; // 定义要更新的数据为退款中
    const response = await axios.put(`http://localhost:8080/api/orders/${orderNumber}`, updateData);
    if (response.status === 200) {
      ElMessage.success('订单状态更新成功');
      // 更新本地数据
      const itemIndex = orders.value.findIndex(item => item.orderNumber === orderNumber);
      if (itemIndex !== -1) {
        orders.value[itemIndex] = {
          ...orders.value[itemIndex],
          ...updateData
        };
      }
    }
  } catch (error) {
    console.error('更新订单状态时出错:', error);
    ElMessage.error('更新订单状态时出错，请稍后重试');
  }
};

// 申请售后的函数
const requestAfterSales = async (orderNumber, afterSales) => {
  try {
    const updateData = { status: 'afterSales', afterSales }; // 定义要更新的数据为售后中，并包含售后原因
    const response = await axios.put(`http://localhost:8080/api/orders/${orderNumber}`, updateData);
    if (response.status === 200) {
      ElMessage.success('订单状态更新成功');
      // 更新本地数据
      const itemIndex = orders.value.findIndex(item => item.orderNumber === orderNumber);
      if (itemIndex !== -1) {
        orders.value[itemIndex] = {
          ...orders.value[itemIndex],
          ...updateData
        };
      }
      afterSalesDialogVisible.value = false; // 关闭售后对话框
    }
  } catch (error) {
    console.error('更新订单状态时出错:', error);
    ElMessage.error('更新订单状态时出错，请稍后重试');
  }
};

// 显示售后对话框的函数
const showAfterSalesDialog = (order) => {
  selectedOrder.value = { ...order }; // 确保 selectedOrder 被正确赋值
  afterSalesDialogVisible.value = true;
};

// 提交售后请求的函数
const submitAfterSalesRequest = () => {
  if (selectedOrder.value.orderNumber && afterSalesReason.value) {
    requestAfterSales(selectedOrder.value.orderNumber, afterSalesReason.value);
  } else {
    ElMessage.error('请选择订单并填写售后原因');
  }
};

// 删除订单的函数
const deleteOrder = async (orderNumber) => {
  try {
    await axios.delete(`http://localhost:8080/api/orders/${orderNumber}`); // 替换为你的后端API地址
    orders.value = orders.value.filter(order => order.orderNumber !== orderNumber);
    alert(`订单 ${orderNumber} 已删除！`);
  } catch (error) {
    console.error('删除订单失败:', error);
    alert(`删除订单 ${orderNumber} 失败，请重试！`);
  }
};

// 查看订单详情的函数
const viewOrderDetails = (orderNumber) => {
  alert(`订单 ${orderNumber} 详情`);
};
</script>

<style scoped>
body {background-color: #f8f9fa;font-size: 14px;}

.order-container {display: flex;background-color: #fff;border-radius: 8px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);padding: 16px;margin: 16px;min-height: 600px;}

.sidebar {width: 180px;border-right: 1px solid #ddd;padding: 10px;box-sizing: border-box;}

.sidebar h3 {font-size: 18px;font-weight: bold;color: black;margin-bottom: 8px;padding-bottom: 4px;border-bottom: 1px solid #ddd;}

.sidebar ul {list-style-type: none;padding: 0;}

.sidebar li {margin: 3px 0;}

.sidebar-link {text-decoration: none;color: inherit;display: block;padding: 3px 0;}

.content {margin-left: 20px;padding: 16px;flex-grow: 1;}

.order-tabs {display: flex;margin-bottom: 8px;}

.order-tabs button {margin-right: 8px;padding: 4px 8px;border: none;background-color: #f5f5f5;border-radius: 4px;transition: background-color .3s;font-size: 12px;}

.order-tabs button.active {background-color: black;color: white;}

.order-period {display: flex;justify-content: space-between;margin-top: 8px;font-size: 12px;}

.divider {border: none;border-top: 1px solid #ddd;margin: 8px 0;}

.order-list {width: 100%;border-collapse: collapse;margin-top: 16px;}

.order-list th,.order-list td {border: 1px solid #ddd;padding: 6px;text-align: center;vertical-align: middle;font-size: 12px;}

.order-list th {background-color: #f2f2f2;}

.product-info {display: flex;align-items: center;}

img {width: 80px;margin-right: 6px;}

.product-details {text-align: left;font-size: 12px;}

.order-actions a {margin-right: 8px;text-decoration: none;color: blue;cursor: pointer;font-size: 12px;}

.dialog-footer {text-align: right;font-size: 12px;}
</style>


