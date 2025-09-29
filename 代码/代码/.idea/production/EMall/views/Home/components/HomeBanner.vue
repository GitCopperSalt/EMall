<script>
import img1 from '@/resources/img/Banner/1.png';
import img2 from '@/resources/img/Banner/2.png';
import img3 from '@/resources/img/Banner/3.png';
import img4 from '@/resources/img/Banner/4.png';
import img5 from '@/resources/img/Banner/5.png';
import img6 from '@/resources/img/Banner/6.png';

export default {
  data() {
    return {
      images: [img1, img2, img6, img4, img5]
    };
  }
}
</script>

<template>
  <div class="home-banner">
    <el-carousel height="400px">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.home-banner {
  width: 1000px;
  height: 400px;
  
  left: 0;
  top: 0;
  z-index: 98;

  img {
    height: 400px;
    /* 设置图片高度为100% */
    width: 100%;
    /* 宽度自适应 */
    object-fit: cover;
    /* 图片覆盖，以保持比例 */
  }
}
</style>