<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, nextTick } from 'vue'

// 在App.vue或入口文件中
onMounted(() => {
  setViewportScale(0.75)
  window.addEventListener('resize', handleResize)
})

const setViewportScale = (scale) => {
  const viewportMeta = document.querySelector('meta[name="viewport"]')
  const actualWidth = window.screen.width * scale
  viewportMeta.content = `width=${actualWidth}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=no`
}

const handleResize = () => {
  nextTick(() => {
    setViewportScale(0.75)
  })
}
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
/* 全局样式 */
html {
  transform: scale(0.75);
  transform-origin: 0 0;
  width: 133.33%;  /* 补偿缩放：100% / 0.75 */
  height: 133.33%;
  overflow-x: hidden;
}

body {
  width: 133.33vw;
  min-height: 133.33vh;
}
</style>
