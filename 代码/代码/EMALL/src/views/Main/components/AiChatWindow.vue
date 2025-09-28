<template>
  <div class="ai-chat-container" v-if="visible">
    <div class="ai-chat-overlay" @click="closeChat"></div>
    <div class="ai-chat-window">
      <div class="chat-header">
        <h3>AI 客服助手</h3>
        <button class="close-btn" @click="closeChat">×</button>
      </div>
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <div class="message-content">
            {{ message.content }}
          </div>
          <div class="message-time">{{ message.time }}</div>
        </div>
      </div>
      <div class="chat-input">
        <input
          v-model="inputMessage"
          @keyup.enter="sendMessage"
          placeholder="请输入您的问题..."
          :disabled="loading"
        />
        <button @click="sendMessage" :disabled="loading || !inputMessage.trim()">
          {{ loading ? '发送中...' : '发送' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AiChatWindow',
  data() {
    return {
      visible: false,
      inputMessage: '',
      loading: false,
      messages: [
        {
          type: 'received',
          content: '您好！我是AI客服助手，有什么可以帮助您的吗？',
          time: this.getCurrentTime()
        }
      ],
      chatId: 'user_' + Math.random().toString(36).substring(2, 9) // 生成唯一的聊天ID
    }
  },
  methods: {
    openChat() {
      this.visible = true
    },
    closeChat() {
      this.visible = false
    },
    getCurrentTime() {
      const now = new Date()
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    },
    async sendMessage() {
      if (!this.inputMessage.trim() || this.loading) return

      // 添加用户消息
      this.messages.push({
        type: 'sent',
        content: this.inputMessage,
        time: this.getCurrentTime()
      })

      const userMessage = this.inputMessage
      this.inputMessage = ''
      this.loading = true

      try {
        // 调用后端API
        const response = await axios.get('http://localhost:10004/assistant/chat', {
          params: {
            chatId: this.chatId,
            message: userMessage
          }
        })

        // 显示AI回复
        this.messages.push({
          type: 'received',
          content: response.data,
          time: this.getCurrentTime()
        })
      } catch (error) {
        console.error('调用AI服务失败:', error)
        this.messages.push({
          type: 'received',
          content: '抱歉，网络似乎有些问题，请稍后重试。',
          time: this.getCurrentTime()
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.ai-chat-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.ai-chat-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.ai-chat-window {
  position: absolute;
  bottom: 80px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: #409eff;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f5f5f5;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
}

.message.sent {
  margin-left: auto;
}

.message.received {
  margin-right: auto;
}

.message-content {
  padding: 10px 15px;
  border-radius: 18px;
  word-wrap: break-word;
}

.message.sent .message-content {
  background: #409eff;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.received .message-content {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  text-align: right;
}

.chat-input {
  display: flex;
  padding: 10px;
  background: white;
  border-top: 1px solid #eee;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 15px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input button:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .ai-chat-window {
    width: calc(100% - 40px);
    height: 70%;
  }
}
</style>
