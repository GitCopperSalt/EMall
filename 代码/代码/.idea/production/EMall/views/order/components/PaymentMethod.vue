<template>
  <div class="payment-page">
    <header>
      <h1>订单提交成功，只差付款了</h1>
      <p class="countdown">
        请您在 <strong>{{ formatTime(countdown) }}</strong> 内完成支付，否则订单将自动取消
      </p>
      <p>订单号：{{ orderNumber }}</p>
      <p class="amount">订单金额：<strong class="bold">￥{{ price }}</strong></p>
    </header>

    <div class="payment-methods">
      <h2>常用</h2>
      <div class="methods-container">
        <label 
          v-for="method in paymentMethods" 
          :key="method.id" 
          class="payment-card"
        >
          <input 
            type="radio" 
            :value="method.name" 
            v-model="selectedMethod"
            @change="updateButtonState"
          />
          <span class="circle" :class="{ selected: selectedMethod === method.name }"></span>
          <img :src="method.image" alt="" class="payment-image" /> <!-- 图片 -->
          <span class="payment-name">{{ method.paymentMethod }}</span>
        </label>
      </div>
      <button 
        class="confirm-button"
        @click="confirmPayment" 
        :class="{ disabled: !selectedMethod }"
        :style="{ backgroundColor: selectedMethod ? 'rgb(207, 10, 44)' : 'gray' }"
        :disabled="!selectedMethod"
      >
        确认支付
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const orderNumber = ref(route.query.orderNumber);
    const price = ref(parseFloat(route.query.finalAmount));
    const quantity = ref(parseFloat(route.query.quantity));
    const countdown = ref(899); // 14分钟59秒 = 899秒
    const selectedMethod = ref('');
    
    const paymentMethods = [
      { id: 1, name: 'alipay', paymentMethod: '支付宝', image: 'https://ts1.cn.mm.bing.net/th/id/R-C.9e2a4ef9ee7bf9e7ccffe30ac3d672fd?rik=6UmyknUF2W2ocA&riu=http%3a%2f%2fpic.616pic.com%2fys_img%2f00%2f03%2f80%2fLlGfYpnebC.jpg&ehk=XEBLyH1n28Hy%2foPO6xCic3Dvg2jv%2bY2eZ6Qc6nNoGLA%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1' },
      { id: 2, name: 'weixin', paymentMethod: '微信支付', image: 'https://gd-hbimg.huaban.com/5ad2ec5de7ec9882bed5bbd8ecfac308b6e5c58a1ed94-btMWS6_fw658' },
      { id: 3, name: 'huodong', paymentMethod: '花呗分期', image: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.T7MPuip8CyB_zZGsGo3LSAHaF2?rs=1&pid=ImgDetMain' },
      { id: 4, name: 'cmb', paymentMethod: '招商银行', image: 'https://ts1.cn.mm.bing.net/th/id/R-C.73345a631b8bcf3c513c1a8f6e25a75e?rik=C%2b4iVL4o2Gc0JA&riu=http%3a%2f%2fwww.logo11.cn%2fuploads%2fallimg%2f130426%2f1_130426212656_1.jpg&ehk=oXRMmfW%2bBz4TLiqRNyGIbf%2bTMZr6nU59nMs3XKGZbMo%3d&risl=&pid=ImgRaw&r=0' },
    ];

    const startCountdown = () => {
      const timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(timer);
          alert('时间到，订单已取消');
          notifyCancelled(); // 发送取消请求
        }
      }, 1000); // 每秒更新
    };

    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${hours}时${minutes}分${seconds}秒`;
    };

    const confirmPayment = async () => {
      if (!selectedMethod.value) {
        alert('请先选择支付方式');
        return;
      }

      const selectedPaymentMethod = paymentMethods.find(method => method.name === selectedMethod.value).paymentMethod;

      const paymentData = {
        orderNumber: orderNumber.value,
        payment: price.value,
        paymentMethod: selectedPaymentMethod,
        status: 'toReceive',
        price: price.value,
        quantity: quantity.value
      };

      try {
        const response = await axios.put(`http://localhost:8080/api/orders/${orderNumber.value}`, paymentData);
        console.log('支付成功:', response.data);
        console.log(paymentData)
        alert('支付成功');
        router.push('/myorder');
      } catch (error) {
        console.error('支付失败:', error);
        alert('支付失败，请重试');
      }
    };

    const notifyCancelled = async () => {
      const cancellationData = {
        orderNumber: orderNumber.value,
        status: 'cancelled',
      };

      try {
        await axios.put(`http://localhost:8080/api/orders/${orderNumber.value}`, cancellationData);
        console.log('订单已取消');
      } catch (error) {
        console.error('取消订单失败:', error);
        alert('取消订单失败，请重试');
      }
    };

    onMounted(() => {
      startCountdown();
    });

    return {
      orderNumber,
      price,
      countdown,
      selectedMethod,
      paymentMethods,
      startCountdown,
      confirmPayment,
      formatTime,
    };
  },
};
</script>

<style scoped>
.payment-page {
  background-color: transparent; 
  padding: 20px;
  border-radius: 5px;
  max-width: 900px;
  margin: auto;
}

header {
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px; /* 增加标题下边距 */
}

.countdown,
.amount {
  font-size: 22px; /* 主要文字 */
  line-height: 1.6; /* 增加行高 */
  margin-bottom: 10px; /* 增加段落下边距 */
}

.countdown strong {
  font-weight: bold; /* 加粗 */
  color: black; /* 设置为黑色 */
}

.amount .bold {
  font-weight: bold; /* 加粗 */
}

.payment-methods {
  background-color: white; /* 支付方式背景 */
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.methods-container {
  display: flex;
  flex-direction: column;
}

.payment-card {
  display: flex; 
  align-items: center;
  margin: 10px 0; /* 增加间距 */
  cursor: pointer;
  font-size: 22px; /* 字体大小 */
  border: 2px solid #f0f0f0; /* 边框始终显示 */
  padding: 10px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
  transition: border-color 0.3s;
}

.payment-card input {
  display: none; /* 隐藏原始的单选按钮 */
}

.circle {
  width: 20px;
  height: 20px;
  border: 2px solid #f0f0f0;
  border-radius: 50%; /* 圆形 */
  margin-right: 10px;
  transition: background-color 0.3s, border-color 0.3s;
}

.circle.selected {
  background-color: rgb(207, 10, 44); /* 选择后圆圈变红 */
  border-color: rgb(207, 10, 44);
}

.payment-name {
  margin-left: 10px; /* 增加支付方式名称与圆圈之间的间距 */
}

.payment-image {
  /* 设置图片宽度 */
  height: 40px; /* 设置图片高度 */
  margin-right: 10px; /* 增加图片与文本之间的间距 */
}

.confirm-button {
  margin-top: auto; /* 按钮推到底部 */
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 25px; /* 胶囊形状 */
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 22px; /* 确认支付按钮字体大小 */
}

.confirm-button.disabled {
  background-color: gray; /* 禁用状态背景颜色 */
}

button.disabled {
  cursor: not-allowed; 
}
</style>
