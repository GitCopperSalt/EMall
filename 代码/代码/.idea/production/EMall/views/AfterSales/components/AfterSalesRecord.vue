<template>
  <h2>已处理完成售后的商品</h2>
  <div class="notice" v-if="message">
    {{ message }}
  </div>
  <table class="order-list">
    <thead>
      <tr>
        <th>商品图</th>
        <th>订单号</th>
        <th>商品信息</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in records" :key="index" class="">
        <td>
          <img :src="record.image" alt="商品图片 ">
        </td>
        <td>
          申请订单号: {{ record.id }}
        </td>
        <td>
          <p>产品名称: {{ record.product }}</p>
          <p>问题描述: {{ record.issue }}</p>
        </td>
        <td>{{ record.status }}</td>
        <td class="product-info-column">
          <button class="delete-button" @click="handleDeleteClick(index)">删除记录</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const afterSalesRecords = [
      {
        id: 123456789,
        product: 'Mate60pro',
        issue: '屏幕破裂',
        status: '已处理',
        image: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202403/gbom/6942103109485/428_428_D298F24F4307AB4102C06E1827106530mp.png"
      },
      {
        id: 234567891,
        product: 'Nova13pro',
        issue: '屏幕失灵',
        status: '已处理',
        image: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202410/gbom/6942103137105/428_428_35B4E49B9CDCA1FD075F6CB2F8840B69mp.png"
      },
      {
        id: 345678912,
        product: 'iPhone15',
        issue: '扬声器损坏',
        status: '已处理',
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-compare-iphone-15-202409?wid=384&hei=512&fmt=jpeg&qlt=90&.v=1724187551268"
      }
    ];

    const records = ref(afterSalesRecords);
    const message = ref('');

    const handleDeleteClick = (index) => {
      try {
        // 删除记录
        records.value.splice(index, 1);
        // 弹窗提醒删除成功
        alert('删除成功');
      } catch (error) {
        console.error('处理删除点击时出错:', error);
        // 弹窗提醒删除失败
        alert('删除失败，请重试');
      }
    };

    return {
      records,
      handleDeleteClick,
      message
    };
  }
};
</script>
<style scoped>
.notice {
  background-color: #fffbcc;
  border: 1px solid #e6db55;
  padding: 8px;
  border-radius: 5px;
  color: green;
  margin-bottom: 16px;
}

body {
  background-color: #f8f9fa;
  font-size: 14px;
}

h2 {
  color: #333;
  margin-bottom: 16px;
  font-size: 18px;
}

.order-container {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
  min-height: 500px;
}

.sidebar {
  width: 180px;
  border-right: 1px solid #ddd;
  padding: 8px;
  box-sizing: border-box;
}

.sidebar h3 {
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid #ddd;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 3px 0;
}

.sidebar-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 3px 0;
}

.content {
  margin-left: 20px;
  padding: 16px;
  flex-grow: 1;
}

.order-tabs {
  display: flex;
  margin-bottom: 8px;
}

.order-tabs button {
  margin-right: 8px;
  padding: 4px 8px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  font-size: 12px;
}

.order-tabs button.active {
  background-color: black;
  color: white;
}

.order-period {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
}

.divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 8px 0;
}

.order-list {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.order-list th,
.order-list td {
  border: 1px solid #ddd;
  padding: 6px;
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
}

.order-list th {
  background-color: #f2f2f2;
}

.product-info {
  display: flex;
  align-items: center;
}

img {
  width: 80px;
  margin-right: 6px;
}

.product-details {
  text-align: left;
  font-size: 12px;
}

.order-actions a {
  margin-right: 8px;
  text-decoration: none;
  color: blue;
  cursor: pointer;
  font-size: 12px;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
