<template>
  <!-- 内容区域 -->
  <el-main>
    <div>
      <el-form @submit.prevent="submitFirstStep" class="el-form">
        <!-- 第一步表单的输入字段 -->
        <el-form-item>
          <label>*产品名称:</label>
          <el-input type="text" v-model="product.productName" required></el-input>
        </el-form-item>
        <el-form-item>
          <label>*产品型号:</label>
          <el-input type="text" v-model="product.productModel" required></el-input>
        </el-form-item>
        <el-form-item>
          <label>*产品入网型号:</label>
          <el-input type="text" v-model="product.productNetworkModel" required></el-input>
        </el-form-item>
        <el-form-item>
          <label>产品颜色:</label>
          <el-input type="text" v-model="product.productColor"></el-input>
        </el-form-item>
        <el-form-item>
          <label>产品图片:</label>
          <el-input type="text" v-model="product.productImage"></el-input>
        </el-form-item>
        <el-form-item>
          <label>产品发布日期:</label>
          <el-input type="date" v-model="product.releaseDate"></el-input>
        </el-form-item>
        <el-form-item>
          <label>*产品编号:</label>
          <el-input type="text" v-model="product.productId" required></el-input>
        </el-form-item>
        <el-button type="primary" @click="goToNextStep">下一步，填写商品参数</el-button>
      </el-form>

      <!-- 第二步表单，用于填写商品参数 -->
      <el-form v-if="showSecondStep" @submit.prevent="submitSecondStep" class="el-form">
        <h3>② 填写商品参数</h3>
        <!-- 商品参数输入字段 -->
        <el-form-item v-for="field in parameterFields" :key="field.name">
          <label :for="field.name">{{ field.label }}:</label>
          <el-input type="text" :id="field.name" v-model="productParameters[field.name]"
                    :required="field.required"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitSecondStep">完成填写</el-button>
      </el-form>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

// 商品基本信息响应式引用
const product = ref({
  productName: '', // 产品名称
  productModel: '', // 产品机型
  productNetworkModel: '', // 产品入网型号
  productColor: '', // 产品颜色
  productImage: '', // 产品图片
  releaseDate: '', // 产品发布日期
  productId: '', // 产品编号
  configurationId: '', // 配置ID
  parameterId: '', // 参数ID
  category_id: '', // 类别ID
  brand_id: '', // 品牌ID
  product_https: '', // 产品HTTPS链接
});

// 商品参数响应式引用
const productParameters = ref({
  parameter_fuselage_size: '', // 机身尺寸
  parameter_weight: '', // 机身重量
  parameter_memory_card: '', // 是否支持内存卡
  parameter_screen_size: '', // 屏幕尺寸
  parameter_screen_refresh: '', // 屏幕刷新率
  parameter_screen_resolution: '', // 屏幕分辨率
  parameter_screen_feature: '', // 屏幕特色
  parameter_rear2: '', // 后摄像2
  parameter_rear3: '', // 后摄像3
  parameter_front_camera: '', // 前摄像
  parameter_battery_capacity: '', // 电池容量
  parameter_charging_power: '', // 充电功率
  parameter_USB: '', // 充电接口
  parameter_Biometrics: '', // 生物识别
  parameter_OS: '', // 操作系统
  parameter_5G: '', // 5G
  parameter_4G: '', // 4G
  parameter_satellite: '', // 卫星网络
  parameter_2card_type: '', // 双卡机类型
  parameter_card_number: '', // SIM卡数量
  parameter_card_type: '', // SIM卡类型
  parameter_CPU_model: '', // CPU型号
  parameter_run_memory: '', // 运行内存
  parameter_fuselage_memory: '', // 机身内存
  parameter_screen_material: '', // 屏幕材质
  parameter_3standards: '' // 三防标准
});

// 控制是否显示第二步表单的响应式引用
const showSecondStep = ref(false);

// 商品参数字段定义数组
const parameterFields = ref([
  { name: 'parameter_fuselage_size', label: '机身尺寸', required: true },
  { name: 'parameter_weight', label: '机身重量', required: true },
  { name: 'parameter_memory_card', label: '是否支持内存卡', required: true },
  { name: 'parameter_screen_size', label: '屏幕尺寸', required: true },
  { name: 'parameter_screen_refresh', label: '屏幕刷新率', required: true },
  { name: 'parameter_screen_resolution', label: '屏幕分辨率', required: true },
  { name: 'parameter_screen_feature', label: '屏幕特色' },
  { name: 'parameter_rear2', label: '后摄像2' },
  { name: 'parameter_rear3', label: '后摄像3' },
  { name: 'parameter_front_camera', label: '前摄像' },
  { name: 'parameter_battery_capacity', label: '电池容量', required: true },
  { name: 'parameter_charging_power', label: '充电功率', required: true },
  { name: 'parameter_USB', label: '充电接口', required: true },
  { name: 'parameter_Biometrics', label: '生物识别' },
  { name: 'parameter_OS', label: '操作系统', required: true },
  { name: 'parameter_5G', label: '5G' },
  { name: 'parameter_4G', label: '4G' },
  { name: 'parameter_satellite', label: '卫星网络' },
  { name: 'parameter_2card_type', label: '双卡机类型' },
  { name: 'parameter_card_number', label: 'SIM卡数量', required: true },
  { name: 'parameter_card_type', label: 'SIM卡类型' },
  { name: 'parameter_CPU_model', label: 'CPU型号', required: true },
  { name: 'parameter_run_memory', label: '运行内存', required: true },
  { name: 'parameter_fuselage_memory', label: '机身内存', required: true },
  { name: 'parameter_screen_material', label: '屏幕材质' },
  { name: 'parameter_3standards', label: '三防标准' }
]);

// 响应式引用，用于存储从后端获取的产品数据
const productList = ref([]);

// 提交第一步表单的方法
const submitFirstStep = () => {
  // 简单的验证逻辑，确保所有必填字段都已填写
  if (
    product.value.productName &&
    product.value.productModel &&
    product.value.productNetworkModel &&
    product.value.productId
  ) {
    // 将产品编号赋值给配置ID和参数ID
    product.value.configurationId = product.value.productId;
    product.value.parameterId = product.value.productId;
    showSecondStep.value = true; // 显示第二步表单
  } else {
    console.error('请填写所有必填字段');
  }
};

const goToNextStep = () => {
  // 可以在这里添加验证逻辑，确保第一步的表单已经正确填写
  if (
    product.value.productName &&
    product.value.productModel &&
    product.value.productNetworkModel &&
    product.value.productId
  ) {
    // 将产品编号赋值给配置ID和参数ID
    product.value.configurationId = product.value.productId;
    product.value.parameterId = product.value.productId;
    showSecondStep.value = true;
  } else {
    console.error('请填写所有必填字段');
  }
};

// 提交第二步表单的方法
const submitSecondStep = () => {
  // 合并product和productParameters
  const productData = {
    ...product.value,
    ...productParameters.value
  };

  axios.post('http://localhost:8080/api/products', productData)
    .then(response => {
      console.log('提交成功', response);
      showSecondStep.value = false;
      product.value = {
        productName: '',
        productModel: '',
        productNetworkModel: '',
        productColor: '',
        productImage: '',
        releaseDate: '',
        productId: '',
        configurationId: '',
        parameterId: '',
        category_id: '',
        brand_id: '',
        product_https: '',
      };
      productParameters.value = {
        parameter_fuselage_size: '',
        parameter_weight: '',
        parameter_memory_card: '',
        parameter_screen_size: '',
        parameter_screen_refresh: '',
        parameter_screen_resolution: '',
        parameter_screen_feature: '',
        parameter_rear2: '',
        parameter_rear3: '',
        parameter_front_camera: '',
        parameter_battery_capacity: '',
        parameter_charging_power: '',
        parameter_USB: '',
        parameter_Biometrics: '',
        parameter_OS: '',
        parameter_5G: '',
        parameter_4G: '',
        parameter_satellite: '',
        parameter_2card_type: '',
        parameter_card_number: '',
        parameter_card_type: '',
        parameter_CPU_model: '',
        parameter_run_memory: '',
        parameter_fuselage_memory: '',
        parameter_screen_material: '',
        parameter_3standards: ''
      };
    })
    .catch(error => {
      console.error('提交失败', error);
    });
};

// 从后端获取产品数据
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    productList.value = response.data;
  } catch (error) {
    console.error('获取产品数据失败', error);
  }
};
// 在组件挂载时获取产品数据
onMounted(() => {
  fetchProducts();
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

/* 表单样式 */
.el-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item__label {
  font-weight: bold;
  color: #333;
}

.el-input,
.el-select .el-input__inner,
.el-textarea__inner {
  width: 100%;
  border-color: #dcdfe6;
}

.el-input-number__inner {
  width: 100%;
}

.el-button {
  width: 100%;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.el-button:hover {
  background-color: #66b1ff;
}

.el-form-item__content {
  line-height: 32px;
}
</style>
