<template>
  <div class="address-card">
    <button @click="addAddress" class="btn-add-address">+ 新增收货地址</button>
    <div class="address-title">收货地址</div>

    <div v-if="!viewAll" class="address-content" :class="{ selected: selectedAddress >= 0 }" @click="selectAddress(0)">
      <input type="radio" name="selectedAddress" :value="0" v-model="selectedAddress" style="display: none;" />
      <div class="address-info">
        <strong>{{ addresses[0].name }} &nbsp; {{ addresses[0].phone }}</strong>
        <span class="default-tag" v-if="addresses[0].isDefault">默认地址</span><br>
        {{ addresses[0].details }}
      </div>
    </div>

    <a v-if="!viewAll" @click.prevent="showAll" class="view-all">查看全部地址</a>

    <div v-if="viewAll">
      <div v-for="(address, index) in addresses" :key="index" class="address-content" :class="{ selected: selectedAddress === index }" @click="selectAddress(index)">
        <input type="radio" name="selectedAddress" :value="index" v-model="selectedAddress" style="display: none;" />
        <div class="address-info">
          <strong>{{ address.name }} &nbsp; {{ address.phone }}</strong>
          <span class="default-tag" v-if="address.isDefault">默认地址</span><br>
          {{ address.details }}
        </div>
      </div>
      <a @click.prevent="viewAll = false" class="view-all">收起地址</a>
    </div>
  </div>

  <div class="container">
    <div class="product-wrapper">
      <div class="product-card">
        <div class="product-header">
          <img :src="product.image" alt="Product Image" class="product-image" /> <!-- 修改这里的 src 属性 -->
          <div class="product-info">
            <h2>{{ product.name }} {{ selectedColor }} {{ selectedVersion }} {{ selectedService }}</h2>
            <div class="product-price-section">
              <span>x{{ quantity }}</span>
              <span class="current-price">{{ product.currentPrice }}</span>
            </div>
          </div>
        </div>
          

        <hr />

        <h3>赠品:</h3>
        <ul class="gifts-list">
          <li v-for="(gift, index) in product.gifts" :key="index">
            🎁 {{ gift }} <span>x1</span>
          </li>
        </ul>

        <hr />

        <h3 class="invoice-title">发票信息</h3>
        <p class="invoice-note">注：如果商品由第三方卖家销售，则发票由第三方卖家开具。</p>
        <div class="invoice-info">
          <span>数电普通发票</span>
          <span>个人</span>
          <a href="#" class="modify-link">修改</a>
        </div>
      </div>

      <div class="delivery-info">
        <h3>商品由 <span class="store-name" :style="{ color: mainColor }">{{ storeName }}</span> 选择合作快递</h3>
        <p><span class="icon" :style="{ color: mainColor }">●</span> 标准配送</p>
        <hr />
        <div class="cost-info">
          <p>商品总金额: <strong>{{ totalAmount }}</strong></p>
          <p>运费: <strong>{{ shippingCost }}</strong></p>
          <p>优惠金额: <span class="warning" :style="{ color: warningColor }">ⓘ</span> - <strong>{{ discountAmount }}</strong></p>
          <p>积分: - <strong>{{ points }}</strong></p>
          <strong class="final-price" :style="{ color: warningColor }">结算金额: {{ finalAmount }}</strong>
        </div>
      </div>
    </div>

    <div class="payment-card">
      <div class="payment-info">
        <span>应付金额:</span>
        <strong class="payment-amount">￥{{ finalAmount }}</strong>
      </div>
      <div class="address-info">
        配送至: {{ selectedAddressDetails.name }} {{ selectedAddressDetails.phone }}<br>{{ selectedAddressDetails.details }}
      </div>
      <button class="submit-order" @click="submitOrder">提交订单</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore'; // 确保路径正确
import router from '@/router'; // 确保引入了 Vue Router

export default {
  setup() {
    const storeName = ref('乐享商城');
    const mainColor = '#cf0a2c';
    const warningColor = '#cf0a2c';

    const totalAmount = ref('￥0.00');
    const shippingCost = ref('￥0.00');
    const discountAmount = ref('￥0.00');
    const points = ref('￥0.00');
    const finalAmount = ref('￥0.00');

    const product = ref({
      name: '',
      currentPrice: '',
      gifts: [],
      image: '', // 添加 image 字段
    });

    const selectedAddress = ref(0);
    const viewAll = ref(false);
    const addresses = ref([
      { name: '何杰', phone: '14737125836', details: '河南 郑州 金水区 东风路街道 郑州轻工业大学第二生活区8号楼地下室菜鸟驿站', isDefault: true },
      { name: '何杰', phone: '14737125836', details: '北京 北京市 朝阳区 北三环西路10号院1号楼1单元101室', isDefault: false }
    ]);

    const selectedColor = ref('');
    const selectedImage = ref('');
    const selectedPayment = ref('');
    const selectedService = ref('');
    const selectedVersion = ref('');

    const userStore = useUserStore();
    const username = computed(() => userStore.userInfo?.username || '');

    const quantity = ref(1);
    const totalPrice = ref(0);

    const loadData = () => {
  try {
    product.value.name = localStorage.getItem('productName') || '';
    product.value.currentPrice = localStorage.getItem('totalPrice') || '';
    product.value.image = localStorage.getItem('selectedImage') || ''; // 添加 image 字段
    console.log('Product Image:', product.value.image); // 添加日志
    selectedColor.value = localStorage.getItem('selectedColor') || '';
    selectedImage.value = localStorage.getItem('selectedImage') || '';
    selectedPayment.value = localStorage.getItem('selectedPayment') || '';
    selectedService.value = localStorage.getItem('selectedService') || '';
    selectedVersion.value = localStorage.getItem('selectedVersion') || '';
    selectedAddress.value = parseInt(localStorage.getItem('selectedAddress')) || 0;
    quantity.value = parseInt(localStorage.getItem('quantity')) || 1;
    totalAmount.value = localStorage.getItem('totalPrice') || '';
    finalAmount.value = localStorage.getItem('totalPrice') || '';
  } catch (error) {
    console.error('加载数据失败:', error);
  }
};

//传路经，计算属性，pinia,父子组件传值   
  onMounted(() => {
      loadData();
    });

    const addAddress = () => {
      console.log('新增收货地址');
    };

    const showAll = () => {
      viewAll.value = true;
    };

    const selectAddress = (index) => {
      selectedAddress.value = index;
      persistData();
    };

    const persistData = () => {
      try {
        localStorage.setItem('selectedAddress', selectedAddress.value);
        localStorage.setItem('quantity', quantity.value);
        localStorage.setItem('totalPrice', totalPrice.value);
        localStorage.setItem('productName', product.value.name);
        localStorage.setItem('productImage', product.value.image); // 添加 image 字段
        localStorage.setItem('selectedColor', selectedColor.value);
        localStorage.setItem('selectedImage', selectedImage.value);
        localStorage.setItem('selectedPayment', selectedPayment.value);
        localStorage.setItem('selectedService', selectedService.value);
        localStorage.setItem('selectedVersion', selectedVersion.value);
        localStorage.setItem('finalAmount', finalAmount.value);
      } catch (error) {
        console.error('持久化数据失败:', error);
      }
    };

    const selectedAddressDetails = computed(() => {
      return addresses.value[selectedAddress.value] || {};
    });

    const generateOrderNumber = () => {
      return `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
    };

    const submitOrder = async () => {
      if (!username.value) {
        console.error('无法获取 username，用户未登录');
        alert('请先登录再提交订单');
        return;
      }

      const orderData = {
  orderNumber: generateOrderNumber(),
  username: username.value,
  date: new Date().toISOString().slice(0, 19).replace('T', ' '), // 转换日期时间格式
  price: finalAmount.value.replace('￥', ''), // 添加 price 字段，并去除人民币符号
  productName: product.value.name, // 添加 productName 字段
  quantity: quantity.value, // 添加 quantity 字段
  status: 'pending', // 添加 status 字段，假设初始状态为 'pending'
  image: selectedImage.value, // 添加 image 字段
  selectedColor: selectedColor.value, // 添加 selectedColor 字段
  selectedService: selectedService.value, // 添加 selectedService 字段
  selectedVersion: selectedVersion.value, // 添加 selectedVersion 字段
  address: selectedAddressDetails.value.details, // 传递地址的详细信息
  name: selectedAddressDetails.value.name, // 传递地址的名字
  phone: selectedAddressDetails.value.phone, // 传递地址的电话
};

      try {
        const response = await axios.post('http://localhost:8080/api/orders', orderData);
        console.log('订单提交成功:', response.data);

        // 使用生成的订单编号作为查询参数传递给 PaymentMethod.vue
        router.push({
  path: '/paymentMethod',
  query: { 
    orderNumber: orderData.orderNumber, 
    finalAmount: totalAmount.value.replace('￥', ''),
    quantity: quantity.value // 添加数量字段
  }
});
      } catch (error) {
        console.error('订单提交失败:', error);
        alert('订单提交失败，请稍后再试');
      }
    };


    return {
      storeName,
      mainColor,
      warningColor,
      totalAmount,
      shippingCost,
      discountAmount,
      points,
      finalAmount,
      product,
      selectedAddress,
      viewAll,
      addresses,
      selectedColor,
      selectedImage,
      selectedPayment,
      selectedService,
      selectedVersion,
      addAddress,
      showAll,
      selectAddress,
      persistData,
      quantity,
      totalPrice,
      selectedAddressDetails,
      submitOrder,
      username,
    };
  },
};
</script>

<style scoped>
.address-card {
  max-width: 1750px;
  margin: 20px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
}

.address-title {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.address-content {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
}

.address-content.selected {
  border-color: #b23535;
}

.address-info {
  margin-left: 10px;
  line-height: 1.5;
  color: #555;
}

.default-tag {
  background-color: rgb(207, 10, 44);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 14px;
  margin-left: 10px;
}

.btn-add-address {
  background-color: #f0f0f0;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  top: 20px;
  right: 20px;
}

.btn-add-address:hover {
  background-color: #e0e0e0;
}

.view-all {
  display: block;
  margin-top: 10px;
  color: #666;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-wrapper {
  display: flex;
  max-width: 1750px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.product-card {
  padding: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
  flex: 2;
}

.delivery-info {
  flex: 1;
  max-width: 500px;
  background-color: #f6f6f6;
  border: 1px solid #ddd;
  border-radius: 0 8px 8px 0;
  padding: 30px;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.payment-card {
  width: 100%;
  max-width: 1750px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.payment-info {
  font-size: 18px;
  color: #333;
}

.payment-amount {
  color: red;
  font-size: 20px;
  margin-left: 10px;
}

.address-info {
  flex: 1;
  margin-left: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
}

.submit-order {
  background-color: #ca141d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.product-header {
  display: flex;
  align-items: center;
}

.product-image {
  width: 120px;
  height: auto;
  margin-right: 20px;
}

.product-info {
  flex: 1;
}

.product-price-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.current-price {
  font-weight: bold;
  margin-left: 10px;
  font-size: 18px;
}

.icon {
  color: rgb(207, 10, 44);
  font-size: 20px;
  vertical-align: middle;
  margin-right: 5px;
}

.gifts-list {
  list-style: none;
  padding: 0;
}

.gifts-list li {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 16px;
}

.invoice-title {
  font-size: 18px;
  margin-bottom: 5px;
}

.invoice-note {
  color: #777;
  font-size: 14px;
  margin-bottom: 10px;
}

.invoice-info {
  display: flex;
  gap: 20px;
  font-size: 16px;
}

.modify-link {
  color: #007bff;
  text-decoration: none;
}

.cost-info {
  font-size: 16px;
  color: #333;
}

.warning {
  color: rgb(207, 10, 44);
}

.final-price {
  font-size: 18px;
  display: block;
  margin-top: 15px;
}

.store-name {
  color: rgb(207, 10, 44);
}

hr {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #eee;
}
</style>
