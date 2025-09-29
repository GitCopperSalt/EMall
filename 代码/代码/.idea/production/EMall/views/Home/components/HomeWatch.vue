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
  <HomePanel title="穿戴专区" > 
    <ul class="goods-list">
      <li>
        <a href="https://www.vmall.com/product/comdetail/index.html?prdId=10086275328840&sbomCode=2901010102801" target="_blank">
            <img src="#" alt="" />
            <p class="name">HUAWEI Watch GT 5</p>
            <p class="desc">玄玑感知系统 | 全新跑骑体验 | 情绪健康助手</p>
        </a>
    </li>
    <li>
      <a href="https://www.mi.com/shop/buy/detail?product_id=20794" target="_blank">
          <img src="#" alt="" />
          <p class="name">Xiaomi Redmi Watch 5</p>
          <p class="desc">2.07英寸高刷高亮大屏 | 24天超长续航 | 搭载小米澎湃OS 2</p>
      </a>
  </li>
  
  <li>
    <a href="https://www.mi.com/shop/buy/detail?product_id=19709" target="_blank">
        <img src="#" alt="" />
        <p class="name">HUAWEI WATCH ULTIMATE DESIGN</p>
        <p class="desc">非凡大师</p>
    </a>
</li>
<li>
  <a href="https://www.apple.com.cn/shop/buy-watch/apple-watch" target="_blank">
      <img src="#" alt="" />
      <p class="name">Apple Watch Series 10 </p>
      <p class="desc">全天候视网膜显示屏 (LTPO3 OLED)</p>
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
  margin-bottom: 90px;

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

    .desc {
      color: #999; // 保持描述颜色
      font-size: 14px; // 缩小描述字体大小
    }
  }
}
</style>
