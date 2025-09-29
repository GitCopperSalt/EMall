<template>
  <el-main>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="searchForm.orderNumber" placeholder="订单编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="paginatedItems" style="width: 100%" border stripe>
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="orderNumber" label="订单编号" width="200"></el-table-column>
      <el-table-column prop="date" label="提交时间" width="200"></el-table-column>
      <el-table-column prop="username" label="用户账号" width="200"></el-table-column>
      <el-table-column prop="payment" label="订单金额" width="150">
        <template #default="{ row }">
          <span>¥{{ row.payment }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentMethod" label="支付方式" width="150"></el-table-column>
      <el-table-column prop="status" label="订单状态" width="150">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <!-- 新增操作列用于显示编辑按钮 -->
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button v-if="row.status !== '已取消'" type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑状态对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑订单状态">
      <el-form :model="form">
        <el-form-item label="订单编号">
          <el-input v-model="form.orderNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="form.payment" disabled></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="form.paymentMethod" placeholder="请选择支付方式">
            <el-option label="支付宝" value="alipay"></el-option>
            <el-option label="微信支付" value="weixin"></el-option>
            <el-option label="花呗分期" value="huodong"></el-option>
            <el-option label="招商银行" value="cmb"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="待付款" value="pending"></el-option>
            <el-option label="已完成" value="completed"></el-option>
            <el-option label="待收货" value="toReceive"></el-option>
            <el-option label="已取消" value="cancelled"></el-option>
            <el-option label="退款中" value="refund"></el-option>
            <el-option label="售后中" value="afterSales"></el-option> <!-- 新增这里 -->
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveStatus">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分页条 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="filteredItems.length"
      :page-size="pageSize"
      v-model:current-page="currentPage"
      @current-change="handlePageChange"
    ></el-pagination>
  </el-main>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const searchForm = ref({
      username: '',
      orderNumber: ''
    });
    const items = ref([]);
    const currentPage = ref(1);
    const pageSize = 10;
    const dialogVisible = ref(false);
    const form = ref({
      id: 0,
      orderNumber: '',
      date: '',
      username: '',
      payment: 0,
      paymentMethod: '',
      status: ''
    });

    const statusType = (status) => {
  const types = {
    '已取消': 'danger',
    '待收货': 'warning',
    '已完成': 'success',
    '待付款': 'info',
    '退款中': 'warning',
    '售后中': 'info' // 新增这里
  };
  return types[status] || 'info';
};

const translateStatus = (status) => {
  const translations = {
    'pending': '待付款',
    'completed': '已完成',
    'toReceive': '待收货',
    'cancelled': '已取消',
    'refund': '退款中',
    'afterSales': '售后中' // 新增这里
  };
  return translations[status] || status;
};

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/orders/all');
    items.value = response.data.map(item => ({
      ...item,
      status: translateStatus(item.status)
    }));
  } catch (error) {
    console.error('从API获取数据时出错:', error);
    ElMessage.error('从API获取数据时出错，请稍后重试');
  }
};

const handleSearch = () => {
  currentPage.value = 1;
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

const handleEdit = (row) => {
  form.value = { ...row };
  dialogVisible.value = true;
};

const saveStatus = async () => {
  const updateData = {
    payment: form.value.payment,
    status: form.value.status, // 这里已经是英文状态
    paymentMethod: form.value.paymentMethod,
    orderNumber: form.value.orderNumber
  };


  try {
    // 使用 form.value.orderNumber 作为路径参数
    const response = await axios.put(`http://localhost:8080/api/orders/${form.value.orderNumber}`, updateData);
    if (response.status === 200) {
      ElMessage.success('订单状态更新成功');
      // 更新本地数据
      const itemIndex = items.value.findIndex(item => item.orderNumber === form.value.orderNumber);
      if (itemIndex !== -1) {
        items.value[itemIndex] = {
          ...items.value[itemIndex],
          ...updateData,
          status: translateStatus(updateData.status)
        };
      }
      dialogVisible.value = false;
    }
  } catch (error) {
    console.error('更新订单状态时出错:', error);
    ElMessage.error('更新订单状态时出错，请稍后重试');
  }
};
    const filteredItems = computed(() => {
      return items.value.filter(item => {
        return (
          (!searchForm.value.username || item.username.includes(searchForm.value.username)) &&
          (!searchForm.value.orderNumber || item.orderNumber.includes(searchForm.value.orderNumber))
        );
      });
    });

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      return filteredItems.value.slice(start, end);
    });

    onMounted(() => {
      fetchData();
    });

    return {
      searchForm,
      items,
      currentPage,
      pageSize,
      dialogVisible,
      form,
      statusType,
      handleSearch,
      handlePageChange,
      handleEdit,
      saveStatus,
      filteredItems,
      paginatedItems
    };
  }
};
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

.el-button {
  margin-right: 5px;
}

.el-table th,
.el-table td {
  text-align: center;
}

.el-table .cell {
  padding: 10px 0;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
