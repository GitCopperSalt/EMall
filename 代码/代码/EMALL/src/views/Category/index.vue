<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'; // 引入useRoute
import HomePanel from "@/views/Home/components/HomePanel.vue";
import axios from 'axios'; // 引入axios

const route = useRoute(); // 获取路由对象
const categoryId = parseInt(route.params.id); // 获取URL中的数字，并转换为整数

const selectedCategory = ref('手机'); // 默认选中的分类为“手机”
const categoryData = ref({
  items: [
    { id: 1, name: '手机' },
    { id: 2, name: 'HUAWEI系列' },
    { id: 3, name: 'VIVO系列' },
    { id: 4, name: 'HONOR系列' },
    { id: 5, name: 'XIAOMI系列' },
    { id: 6, name: 'OPPO系列' },
    { id: 7, name: 'APPLE系列' },
  ],
});

// 根据URL中的数字设置默认分类
const defaultCategory = categoryData.value.items.find(item => item.id === categoryId)?.name;
if (defaultCategory) {
  selectedCategory.value = defaultCategory;
}

const goodsList = ref([]); // 初始化为空数组
const filteredGoodsList = ref([]); // 初始化过滤后的商品列表
const minPrice = ref(null);
const maxPrice = ref(null);
const selectedFeatures = ref([]); // 选中的服务特性

// 定义点击分类的方法
const selectCategory = (categoryName) => {
  selectedCategory.value = categoryName; // 更新选中的分类
  filterGoods(); // 调用过滤方法
};

// 定义点击服务特性的方法
const toggleFeature = (feature) => {
  if (selectedFeatures.value.includes(feature)) {
    selectedFeatures.value = selectedFeatures.value.filter(f => f !== feature);
  } else {
    selectedFeatures.value.push(feature);
  }
  filterGoods(); // 调用过滤方法
};

// 定义过滤方法
const filterGoods = () => {
  filteredGoodsList.value = goodsList.value.filter(item => {
    let categoryMatch = selectedCategory.value === '手机' || item.brand === selectedCategory.value.replace('系列', '');
    let priceMatch = true;

    // 检查最低价格
    if (minPrice.value !== null && !isNaN(minPrice.value) && item.configurationPrice < minPrice.value) {
      priceMatch = false;
    }

    // 检查最高价格，如果maxPrice为空，则忽略该条件
    if (maxPrice.value !== null && !isNaN(maxPrice.value) && item.configurationPrice > maxPrice.value) {
      priceMatch = false;
    }

    // 检查服务特性
    let featureMatch = true;
    if (selectedFeatures.value.length > 0) {
      featureMatch = selectedFeatures.value.every(feature => item.features.includes(feature));
    }

    console.log('过滤条件:', categoryMatch, priceMatch, featureMatch); // 添加调试信息
    console.log('商品信息:', item); // 添加调试信息
    return categoryMatch && priceMatch && featureMatch;
  });
};

// 失去焦点时触发过滤
const handlePriceBlur = () => {
  filterGoods();
};

// 将feature的十进制值转换为具体的特征名称
const featureMap = {
  1: '游戏性能',
  2: '摄影摄像',
  4: '超长续航',
  8: '轻薄舒适',
};

// 组件挂载时自动获取数据并过滤
onMounted(() => {
  axios.get('http://localhost:8080/api/products')
    .then(response => {
      goodsList.value = response.data.map(product => {
        let features = [];
        let featureValue = product.feature;
        for (let key in featureMap) {
          if (featureValue & parseInt(key)) {
            features.push(featureMap[parseInt(key)]);
          }
        }
        return {
          id: product.productId,
          name: product.productName,
          configurationPrice: product.configurationPrice, // 使用正确的字段名称
          brand: product.brandName,
          features: features, // 将特征信息转换后的数组
          productImage: product.productImage, // 添加产品图片
        };
      });
      filterGoods(); // 获取数据后调用过滤方法
    })
    .catch(error => {
      console.error('获取产品数据时出错:', error);
    });
});
</script>



<template>
  <div class="page-container">
    <div class="breadcrumb" style="margin-left: 300px;font-size: 16px;margin-top: 30px;">
      <router-link to="/" class="header-link">首页</router-link> &gt; <span class="current">手机</span>
    </div>
    <div class="card-container">
      <div class="main-card">
        <div class="category-section" style="display: flex; margin-bottom: 20px;">
          <span class="label">分类：</span>
          <span v-for="category in categoryData.items" :key="category.id"
            :class="['item', { highlighted: selectedCategory === category.name }]"
            @click="selectCategory(category.name)" style="margin-right: 30px; cursor: pointer;">
            {{ category.name }}
          </span>
        </div>
        <div class="filter-section">
          <span class="label">服务优选：</span>
          <span v-for="feature in ['游戏性能', '摄影摄像', '超长续航', '轻薄舒适']" :key="feature"
            :class="['option', { highlighted: selectedFeatures.includes(feature) }]" @click="toggleFeature(feature)">
            {{ feature }}
          </span>
        </div>
        <div class="sorting-section">
          <span class="label">排序：</span>
          <span class="option highlighted">综合</span>
          <span class="option">最新</span>
          <span class="option">评论数</span>
          <span class="option">价格：</span>
          <input type="number" class="price-input" placeholder="最低价" v-model.number="minPrice"
            @blur="handlePriceBlur" />
          <span class="price-range"> - </span>
          <input type="number" class="price-input" placeholder="最高价" v-model.number="maxPrice"
            @blur="handlePriceBlur" />
        </div>
      </div>
    </div>
  </div>

  <HomePanel>
    <ul class="goods-list">
      <li class="card" v-for="item in filteredGoodsList" :key="item.id">
        <a @click="$router.push(`/product/${item.id}`)" target="_blank"> <!-- 修改此处 -->
          <img :src="item.productImage" :alt="item.name" />
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.configurationPrice }}</p> <!-- 使用正确的字段名称 -->
        </a>
      </li>
    </ul>
  </HomePanel>
</template>


<style>
.goods-list {
  width: 100%;
  display: flex;
  /* 使用flex布局 */
  justify-content: center;
  /* 子元素水平居中 */
  flex-wrap: wrap;
  /* 子元素换行 */
  margin-bottom: 45px;
  /* 下边距 */
  list-style: none;
  /* 去掉列表默认样式 */
  padding: 0;
  /* 去掉内边距 */
  margin: 0 auto;
  /* 上下外边距为0, 左右自动居中 */
  margin-bottom: 100px;
}

.goods-list .card {
  margin: 10px;
  /* 卡片间距 */
  width: 400px;
  height: 450px;
  /* 卡片高度 */
  background: #fff;
  /* 卡片背景颜色为白色 */
  border-radius: 8px;
  /* 卡片圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 卡片阴影效果 */
  transition: transform 0.3s;
  /* 添加变换过渡效果 */
  overflow: hidden;
  /* 处理溢出内容 */
}

.goods-list .card:hover {
  transform: translateY(-5px);
  /* 悬停时向上移动5px */
}

.goods-list img {
  width: 306px;
  /* 图片宽度自适应卡片 */
  height: 306px;
  /* 图片高度 */
  display: block;
  /* 显示为块级元素 */
  margin: 0 auto;
  /* 上下外边距为0, 左右自动居中 */
}

.goods-list p {
  font-size: 22px;
  /* 字体大小 */
  padding: 12px 0;
  /* 上下内边距 */
  text-align: center;
  /* 文本居中 */
  text-overflow: ellipsis;
  /* 溢出文本以省略号显示 */
  overflow: hidden;
  /* 隐藏溢出内容 */
  white-space: nowrap;
  /* 不换行 */
}

.price {
  color: #ff5722;
  /* 价格颜色为橙色 */
}

/* 整体页面容器样式 */
.page-container {
  font-family: Arial, sans-serif;
  /* 字体 */
  font-size: 14px;
  /* 字体大小 */
  line-height: 1.5;
  /* 行高 */
  color: #333;
  /* 字体颜色 */
}

.breadcrumb {
  margin-bottom: 30px;
  /* 下边距 */
}

.current {
  color: #1a73e8;
  /* 当前页面文本颜色 */
}

.card-container {
  display: flex;
  /* 使用flex布局 */
  justify-content: center;
  /* 子元素水平居中 */
  margin: 30px 0;
  /* 上下边距 */
}

.main-card {
  background-color: white;
  /* 主卡片背景颜色为白色 */
  padding: 30px;
  /* 内边距 */
  border-radius: 8px;
  /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
  width: 100%;
  /* 宽度100% */
  max-width: 1650px;
  /* 最大宽度1400px */
}

.category-section,
.filter-section,
.sorting-section {
  margin-bottom: 30px;
  /* 下边距 */
}

.label {
  color: #999;
  /* 标签颜色为灰色 */
  font-size: 18px;
  /* 增大标签字体大小 */
  margin-right: 15px;
  /* 增加右边距 */
}

.item,
.option {
  margin-right: 40px;
  /* 右边距 */
  color: #333;
  /* 字体颜色 */
  font-size: 18px;
  /* 增大字体大小 */
  cursor: pointer;
  /* 鼠标变为手形光标 */
}

.highlighted {
  color: red;
  /* 被选中的标签变为红色 */
}

.price-range {
  color: #999;
  /* 价格范围颜色为灰色 */
}
</style>
