<template>
  <div class="product-detail">
    <div class="breadcrumb"> <router-link to="/" class="header-link">首页</router-link>> {{ product.productName }}</div>
    <div class="main-content" v-if="!loading">
      <div class="left-column">
        <div class="sticky-image">
          <img :src="selectedImage" alt="Product Image" class="main-image" />
          <div class="image-gallery">
            <img :src="product.productImage" @click="selectedImage = product.productImage"
              :class="{ active: selectedImage === product.productImage }" />
          </div>
        </div>
      </div>
      <div class="right-column">
        <h1>{{ product.productName }}</h1>
        <p class="subtitle">{{ product.description }}</p>
        <p class="price">
          <span class="current-price" :style="{ color: product.priceColor || 'rgb(207, 10, 44)' }">¥{{ totalPrice }}</span>
        </p>
        <div class="options">
          <div class="option">
            <h2>颜色</h2>
            <div class="option-values">
              <button v-for="(color, index) in product.colors" :key="index"
                :class="{ selected: selectedColor === color }" @click="selectedColor = color">
                {{ color }}
              </button>
            </div>
          </div>
          <div class="option">
            <h2>版本</h2>
            <div class="option-values">
              <button v-for="(version, index) in product.versions" :key="index"
                :class="{ selected: selectedVersion === version }" @click="selectedVersion = version; calculateTotalPrice()">
                {{ version }}
              </button>
            </div>
          </div>

          <h2>保障服务</h2>
          <div class="service-option" v-for="(service, index) in services" :key="index">
            <h3 @click="changeService(service.name)">{{ service.name }}</h3>
            <div class="option-values">
              <button v-for="(option, idx) in service.options" :key="idx"
                :class="{ selected: service.selectedOption === option }"
                @click="toggleServiceOption(service, option); calculateTotalPrice()">
                {{ option }}
              </button>
            </div>
            <!-- 添加横线 -->
            <hr v-if="service.name === '延长宝'" style="border: 1px solid #ddd; margin: 15px 0;" />
          </div>

          <!-- 选择的产品信息 -->
          <div class="selected-info">
            已选：{{ product.productName }} - {{ selectedColor }}; {{ selectedVersion }}; {{ selectedService }} x{{ quantity }}
          </div>
          <!-- 新增的flex容器 -->
          <div class="controls-row">
            <!-- 购买数量 -->
            <div class="quantity-control">
              <button @click="decreaseQuantity">-</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQuantity">+</button>
            </div>

            <!-- 加入购物车按钮 -->
            <button class="cart-button" @click="addToCart">加入购物车</button>

            <!-- 购买按钮 -->
            <button class="buy-button" @click="goToOrder">立即购买</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>加载中...</div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
const route = useRoute();
const router = useRouter();
const userStore = useUserStore(); // 使用 userStore

// 假设 username 存储在 userInfo 中
const isLoggedIn = () => {
  return !!userStore.userInfo && !!userStore.userInfo.username;
};
const alertAndRedirect = () => {
  alert('请先登录');
  router.push('/login');
};

const product = reactive({
  productName: '',
  description: '',
  configurationPrice: 0,
  productImage: '',
  colors: [],
  versions: [], // 修改为 versions
  payment: [],
  priceColor: '' // 保持不变
});

const selectedImage = ref('');
const selectedColor = ref('');
const selectedVersion = ref('');
const selectedPayment = ref('');
const selectedService = ref('');
const quantity = ref(1);

const services = ref([
  { name: '无忧服务', options: ['Care+（一年期） ¥499', 'Care+（两年期） ¥999'], selectedOption: '' },
  { name: '延长宝', options: ['延长服务宝（一年期） ¥468'], selectedOption: '' },
]);

const totalPrice = ref(0); // 初始总价格
const loading = ref(true);

const changeService = (serviceName) => {
  // 这里可以添加一些逻辑来处理服务的切换
};

const toggleServiceOption = (service, option) => {
  if (service.selectedOption === option) {
    service.selectedOption = '';
  } else {
    service.selectedOption = option;
    selectedService.value = option; // 确保服务选择的值被正确设置
  }
  persistData();
};

const calculateTotalPrice = () => {
  let basePrice = product.configurationPrice;
  let servicePrice = 0;

  services.value.forEach(service => {
    if (service.selectedOption) {
      let price = service.selectedOption.match(/\d+/)[0];
      servicePrice += parseInt(price);
    }
  });

  totalPrice.value = (basePrice + servicePrice) * quantity.value; // 考虑数量对总价的影响
  persistData();
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    calculateTotalPrice(); // 调整数量后重新计算总价
    persistData();
  }
};

const increaseQuantity = () => {
  quantity.value++;
  calculateTotalPrice(); // 调整数量后重新计算总价
  persistData();
};

const addToCart = () => {
  if (!isLoggedIn()) {
    alertAndRedirect();
    return;
  }
  // 这里可以添加逻辑来处理将商品加入购物车的操作
  persistData();
};

const fetchProductData = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
    const data = response.data;
    Object.assign(product, {
      productName: data.productName,
      description: data.description,
      configurationPrice: data.configurationPrice,
      productImage: data.productImage,
      colors: [data.productColor], // 保持不变
      versions: [data.configurationMemory], // 修改为使用 configurationMemory 作为版本
      payment: data.paymentTypes || [], // 保持不变
      priceColor: data.priceColor || '' // 保持不变
    });
    selectedImage.value = product.productImage;
    selectedColor.value = product.colors[0] || '';
    selectedVersion.value = product.versions[0] || '';
    selectedPayment.value = product.payment[0] || '';
    calculateTotalPrice(); // 保持不变
    persistData();
  } catch (error) {
    console.error('获取产品数据失败：', error);
  } finally {
    loading.value = false;
  }
};

const goToOrder = () => {
  if (!isLoggedIn()) {
    alertAndRedirect();
    return;
  }

  // 获取当前选择的数量、服务和商品ID
  const selectedServices = services.value
    .filter(service => service.selectedOption)
    .map(service => service.selectedOption)
    .join(', ');

  const productId = route.params.productId;

  // 将数据作为路由参数传递到下一个页面
  router.push({
    path: `/order`,
    query: { 
      selectedServices, 
      productId, 
      quantity: quantity.value, 
      selectedColor: selectedColor.value, 
      selectedService: selectedService.value, 
      selectedVersion: selectedVersion.value, 
      totalPrice: totalPrice.value 
    }
  });

  persistData();
};


const persistData = () => {
  localStorage.setItem('selectedImage', selectedImage.value);
  localStorage.setItem('selectedColor', selectedColor.value);
  localStorage.setItem('selectedVersion', selectedVersion.value);
  localStorage.setItem('selectedPayment', selectedPayment.value);
  localStorage.setItem('selectedService', selectedService.value);
  localStorage.setItem('quantity', quantity.value);
  localStorage.setItem('totalPrice', totalPrice.value);
  localStorage.setItem('productName', product.productName); // 添加产品名称持久化
};

const loadData = () => {
  selectedImage.value = localStorage.getItem('selectedImage') || '';
  selectedColor.value = localStorage.getItem('selectedColor') || '';
  selectedVersion.value = localStorage.getItem('selectedVersion') || '';
  selectedPayment.value = localStorage.getItem('selectedPayment') || '';
  selectedService.value = localStorage.getItem('selectedService') || '';
  quantity.value = parseInt(localStorage.getItem('quantity')) || 1;
  totalPrice.value = parseInt(localStorage.getItem('totalPrice')) || 0;
  product.productName = localStorage.getItem('productName') || ''; // 添加产品名称加载
};


onMounted(() => {
  const productId = route.params.productId;
  if (productId) {
    fetchProductData(productId);
  } else {
    console.error('ProductId 未找到');
    loading.value = false;
  }
  loadData();
});

watch(selectedVersion, () => {
  calculateTotalPrice();
});
watch(quantity, () => {
  calculateTotalPrice(); // 监听数量变化，重新计算总价
});
watch(services, () => {
  calculateTotalPrice();
}, { deep: true });
</script>



<style scoped>
.product-detail {
  background-color: #fff;
  padding: 20px;
}

.breadcrumb {
  padding: 30px;
  margin: 0 235px;
}

.main-content {
  display: flex;
  padding: 20px;
  margin: 0 10%;
}

.left-column {
  flex: 1;
}

.sticky-image {
  position: sticky;
  top: 20px;
  z-index: 10;
}

.main-image {
  width: 350px; /* 缩小主图像 */
}

.image-gallery {
  display: flex;
  margin-top: 10px;
}

.image-gallery img {
  width: 80px; /* 缩小小图集图像 */
  margin-right: 10px;
  cursor: pointer;
}

.image-gallery img.active {
  border: 2px solid red;
}

.right-column {
  flex: 1;
  margin-left: 20px; /* 缩小左右列间距 */
}

.controls-row {
  display: flex;
  align-items: center;
  margin-top: 10px; /* 缩小按钮区域间距 */
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-right: 10px; /* 缩小间距 */
}

.quantity-control button {
  padding: 5px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  cursor: pointer;
  border-radius: 5px;
}

.quantity-control span {
  margin: 0 5px; /* 缩小间距 */
  font-size: 14px; /* 缩小文字 */
}

.subtitle {
  font-size: 16px; /* 缩小副标题 */
  margin: 10px 0; /* 缩小间距 */
}

.price {
  margin: 10px 0; /* 缩小间距 */
}

.current-price {
  font-size: 24px; /* 缩小价格文字 */
  margin-right: 10px;
}

.options {
  margin: 10px 0; /* 缩小选项区块间距 */
}

.option {
  margin: 10px 0; /* 缩小选项间距 */
}

.option-values button {
  font-size: 16px; /* 缩小选项按钮文字 */
  padding: 10px 20px; /* 缩小按钮内间距 */
  margin: 5px 10px; /* 缩小按钮间距 */
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  border-radius: 10px;
  transition: color 0.3s;
}

.option-values button:hover {
  color: red;
}

.option-values button.selected {
  border-color: red;
  color: red;
}

.service-option {
  margin-top: 10px; /* 缩小服务区块间距 */
}
.quantity-control button {
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #aaa;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.quantity-control button:hover {
  background-color: #f0f0f0;
  color: #333;
}/* 缩小'加入购物车'按钮的尺寸 */
.cart-button {
  padding: 10px 15px; /* 缩小内间距 */
  width: 150px; /* 缩小按钮宽度 */
  background: linear-gradient(to right, rgb(255, 168, 72), rgb(255, 144, 77)); /* 保持原有背景渐变 */
  color: white; /* 保持原有字体颜色 */
  border: none;
  border-radius: 30px; /* 保持原有圆角 */
  cursor: pointer;
  flex-grow: 1;
  font-size: 16px; /* 缩小字体 */
  text-align: center;
  margin-right: 10px; /* 保持原有间距 */
}

/* 缩小'立即购买'按钮的尺寸 */
.buy-button {
  padding: 10px 15px; /* 缩小内间距 */
  width: 150px; /* 缩小按钮宽度 */
  background: linear-gradient(to right, rgb(254, 89, 69), rgb(214, 26, 25)); /* 保持原有背景渐变 */
  color: white; /* 保持原有字体颜色 */
  border: none;
  border-radius: 30px; /* 保持原有圆角 */
  cursor: pointer;
  flex-grow: 1;
  font-size: 16px; /* 缩小字体 */
  text-align: center;
}

.service-option h5 {
  cursor: pointer;
  transition: color 0.3s;
}

.service-option h5:hover {
  color: red;
}

.service-option .option-values {
  margin-top: 10px;
}

.service-option .option-values button {
  cursor: pointer;
  transition: color 0.3s;
}

.service-option .option-values button:hover {
  color: red;
}

.service-option .option-values button.selected {
  border-color: red;
  color: red;
}

hr {
  border: 1px solid #ddd;
  margin: 15px 0;
}
</style>
