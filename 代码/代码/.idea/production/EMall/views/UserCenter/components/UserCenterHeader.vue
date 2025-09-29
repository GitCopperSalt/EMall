<template>
  <header>
    <img src="@/resources/img/logo.jpg" alt="Logo" class="logo" @click="$router.push('/')">
  </header>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
header {
  width: 100%;
  background: #fff;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #ddd;
  
}

.logo {
  height: 100px;
}
</style>