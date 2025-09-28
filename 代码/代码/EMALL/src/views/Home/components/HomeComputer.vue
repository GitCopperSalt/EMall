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
  <HomePanel title="电脑专区" > 
    <ul class="goods-list">
      <li>
        <a href="https://www.apple.com.cn/shop/buy-mac/macbook-air" target="_blank">
            <img src="#" alt="" />
            <p class="name">Apple MacBook Air</p>
            <p class="desc">轻装重拳 M3</p>
        </a>
    </li>
    <li>
      <a href="#" target="_blank">
          <img src="#" alt="" />
          <p class="name">HUAWEI MateBook X Pro</p>
          <p class="desc">980g超轻薄｜柔性OLED全面屏幕</p>
      </a>
  </li>
  
  <li>
    <a href="https://www.mi.com/shop/buy/detail?product_id=19709" target="_blank">
        <img src="#" alt="" />
        <p class="name">Xiaomi Redmi Book Pro 16</p>
        <p class="desc">70W 狂暴性能｜3.1K 165Hz 高刷高亮屏</p>
    </a>
</li>
<li>
  <a href="https://item.lenovo.com.cn/product/1034815.html" target="_blank">
      <img src="#" alt="" />
      <p class="name">Legion Y 7000 P</p>
      <p class="desc">乾坤散热，开启散热新时代</p>
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

    .desc {
      color: #999; // 保持描述颜色
      font-size: 14px; // 缩小描述字体大小
    }
  }
}
</style>
