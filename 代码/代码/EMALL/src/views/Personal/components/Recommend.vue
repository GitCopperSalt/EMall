<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import HomePanel from "@/views/Home/components/HomePanel.vue";

const router = useRouter();
const products = ref([]);
const loading = ref(true);

onMounted(() => {
  fetchProducts();
});

async function fetchProducts() {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('获取产品数据失败：', error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <HomePanel  >
    <ul class="goods-list" v-if="!loading">
      <li v-for="product in products" :key="product.productId">
        <a @click.prevent="router.push({ path: `/product/${product.productId}` })" target="_blank">
            <img :src="product.productImage" alt="" />
            <p class="name">{{ product.productName }}</p>
            <p class="price">&yen;{{ product.configurationPrice }}</p>
        </a>
      </li>
    </ul>
    <div v-else>加载中...</div>
  </HomePanel>
</template>

<style scoped lang='scss'>
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
</style>
