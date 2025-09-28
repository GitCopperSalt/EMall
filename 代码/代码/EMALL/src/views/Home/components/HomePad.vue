<script setup>
import HomePanel from "@/views/Home/components/HomePanel.vue";
import { getHotAPI } from '@/apis/home'
const hotList = ref([])
const getHotList = async () => {
  const res = await getHotAPI()  
  hotList.value = res.result
}
onMounted(()=>getHotList())
</script>

<template>
  <HomePanel title="平板专区" > 
    <ul class="goods-list">
      <li>
        <a href="https://www.vmall.com/product/comdetail/index.html?prdId=10086275328840&sbomCode=2901010102801" target="_blank">
            <img src="#" alt="" />
            <p class="name">HUAWEI MatePad 11</p>
            <p class="price">&yen;1999</p>
        </a>
    </li>
    <li>
      <a href="https://www.mi.com/shop/buy/detail?product_id=20794" target="_blank">
          <img src="#" alt="" />
          <p class="name">VIVO Pad 3 Pro</p>
          <p class="price">&yen;3599</p>
      </a>
  </li>
  
  <li>
    <a href="https://www.mi.com/shop/buy/detail?product_id=19709" target="_blank">
        <img src="#" alt="" />
        <p class="name">一加 Pro</p>
        <p class="price">&yen;3399</p>
    </a>
</li>
<li>
  <a href="https://www.apple.com.cn/shop/buy-watch/apple-watch" target="_blank">
      <img src="#" alt="" />
      <p class="name">ipad pro 2024</p>
      <p class="price">&yen;8999</p>
  </a>
</li>
     
    </ul>
  </HomePanel>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 35px;

  li {
    width: 300px; // 缩小宽度，确保一排能显示4个
    height: 350px; // 缩小高度，与宽度保持比例
    list-style: none;
    background: #fff;
    transition: all .5s;
    margin: 10px;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }

    img {
      width: 250px; // 缩小图片宽度
      height: 250px; // 缩小图片高度
      display: block;
      margin: 0 auto;
      transform: scale(0.8); // 适当缩放图片
      transform-origin: center;
    }

    p {
      font-size: 16px; // 缩小文本字体大小
      padding-top: 0px; // 调整文本间距
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: red; // 设置价格颜色为红色
    }
  }
}
</style>
