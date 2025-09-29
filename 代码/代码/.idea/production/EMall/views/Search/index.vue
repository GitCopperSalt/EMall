<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import HomePanel from "@/views/Home/components/HomePanel.vue";

const router = useRouter();
const route = useRoute();
const products = ref([]);
const loading = ref(true);
const searchQuery = ref('');

onMounted(() => {
  const productIds = route.query.productIds ? JSON.parse(route.query.productIds) : [];
  searchQuery.value = route.query.query || '';  // 获取搜索关键词
  if (productIds.length > 0) {
    fetchProductsByIds(productIds);
  } else {
    loading.value = false;
  }
});

async function fetchProductsByIds(productIds) {
  try {
    const response = await axios.get('http://localhost:8080/api/products/ids', {
      params: { ids: productIds.join(',') }
    });
    products.value = response.data;
  } catch (error) {
    console.error('根据 productId 获取产品数据失败：', error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <HomePanel >
    <div class="search-title">
      <h1>全部结果 > "{{ searchQuery }}"</h1>
    </div>
    <div v-if="!loading">
      <ul class="goods-list" v-if="products.length > 0">
        <li v-for="product in products" :key="product.productId">
          <a @click.prevent="router.push({ path: `/product/${product.productId}` })" target="_blank">
              <img :src="product.productImage" alt="" />
              <p class="name">{{ product.productName }}</p>
              <p class="price">&yen;{{ product.configurationPrice }}</p>
          </a>
        </li>
      </ul>
      <div v-else>
        <div class="no-results">
          <img src="https://res.vmallres.com/portal/1.24.9.300SP01/h5/images/notyet.png" alt="没有找到" />
          <p>抱歉，没找到您搜索的相关产品，请尝试修改搜索词吧！</p>
        </div>
      </div>
    </div>
    <div v-else>加载中...</div>
  </HomePanel>
</template>

<style scoped lang='scss'>
.search-title {
  padding: 20px 0; /* 设置标题的上下内边距 */
  text-align: left; /* 左对齐 */
}

.goods-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 35px;

  li {
    width: 300px;
    height: 350px;
    list-style: none;
    background: #fff;
    transition: all .5s;
    margin: 10px;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 250px;
      height: 250px;
      display: block;
      margin: 0 auto;
    }

    p {
      font-size: 16px;
      padding-top: 0px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}

.no-results {
  text-align: center;
  margin-top: 50px;

  img {
    width: 100px; /* 或根据设计调整 */
    height: auto;
  }

  p {
    font-size: 18px;
    color: #666;
    margin-top: 10px;
  }
}
</style>
