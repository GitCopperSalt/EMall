<!-- views/Layout/components/LayoutFloat.vue -->
<template>
  <div class="floating-box">
    <!-- 在线客服按钮 -->
    <div class="service-icon" @click="openAiChat">
      <div class="icon">🎧</div>
      <div class="text">在线客服</div>
    </div>

    <!-- 返回顶部按钮 -->
    <div class="top-icon" @click="scrollToTop">
      <div class="icon">⬆️</div>
      <div class="text">返回顶部</div>
    </div>

    <!-- AI客服对话窗口 -->
    <AiChatWindow ref="aiChatWindow" />
  </div>
</template>

<script>
import { ref } from 'vue';
import AiChatWindow from '@/views/Main/components/AiChatWindow.vue';

export default {
  components: {
    AiChatWindow
  },
  setup() {
    const aiChatWindow = ref(null);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const openAiChat = () => {
      if (aiChatWindow.value) {
        aiChatWindow.value.openChat();
      }
    };

    return {
      aiChatWindow,
      scrollToTop,
      openAiChat
    };
  },
};
</script>

<style scoped>
.floating-box {
  position: fixed;
  bottom: 40px;
  right: 10px;
  width: 65px;
  padding: 5px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  text-align: center;
}

.service-icon,
.top-icon {
  cursor: pointer;
}

.icon {
  font-size: 24px;
  color: #aaa;
  margin-bottom: 10px;
}

.text {
  font-size: 10px;
  color: #666;
  margin-bottom: 20px;
}

.top-icon .text {
  margin-bottom: 0;
}
</style>
