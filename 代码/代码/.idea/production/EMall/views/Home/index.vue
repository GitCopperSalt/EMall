<script setup>
import HomeCategory from "@/views/Home/components/HomeCategory.vue";
import HomeBanner from "@/views/Home/components/HomeBanner.vue";
import HomePhone from "@/views/Home/components/HomePhone.vue";
import HomeComputer from "@/views/Home/components/HomeComputer.vue";
import HomeWatch from "./components/HomeWatch.vue";
import HomePad from "./components/HomePad.vue";
</script>

<template>

  <div class="container">
    <div class="BC">
      <div class="left">
        <HomeCategory />
      </div>
      <div class="right">
        <HomeBanner />
      </div>
    </div>
      <HomePhone />
      <HomeComputer />
      <HomePad />
     <HomeWatch />
   
    
  </div>

</template>

<style scoped>
.container {

  background-color: rgb(241 243 245);
}

.BC {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: space-evenly;
  /* 控制子元素间距 */
  align-items: center;
  /* 垂直居中对齐 */
  background-color: #fff;
  margin-bottom: 35px; 
}
</style>