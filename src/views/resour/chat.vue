<template>
    <div style="padding-top: 10vh;">
      <h2>WebSocket 聊天</h2>
      <div v-if="username">
        <p>当前用户：{{ username }}</p>
        <div>
          <input v-model="message" placeholder="输入消息..." />
          <input v-model="toName" placeholder="接收方用户名" />
          <button @click="sendMessage">发送</button>
        </div>
        <div>
          <h3>聊天记录：</h3>
          <ul>
            <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
          </ul>
        </div>
      </div>
      <div v-else>
        <input v-model="usernameInput" placeholder="输入用户名" />
        <button @click="connectWebSocket">连接</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ws: null, // WebSocket 对象
        username: "", // 当前用户
        usernameInput: "", // 用户输入
        message: "", // 要发送的消息
        toName: "", // 接收者用户名
        messages: [] // 聊天记录
      };
    },
    methods: {
      connectWebSocket() {
        if (!this.usernameInput) {
          alert("请输入用户名");
          return;
        }
        this.username = this.usernameInput;
  
        // 连接 WebSocket
        this.ws = new WebSocket("ws://localhost:9914/chat");
  
        this.ws.onopen = () => {
          console.log("WebSocket 连接成功");
        };
  
        this.ws.onmessage = (event) => {
          console.log("收到消息:", event.data);
          this.messages.push(event.data);
        };
  
        this.ws.onclose = () => {
          console.log("WebSocket 连接关闭");
        };
  
        this.ws.onerror = (error) => {
          console.error("WebSocket 错误:", error);
        };
      },
      sendMessage() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          const msg = {
            toName: this.toName,
            message: this.message
          };
          this.ws.send(JSON.stringify(msg));
          this.message = "";
        } else {
          alert("WebSocket 连接未建立");
        }
      }
    },
    beforeUnmount() {
      if (this.ws) {
        this.ws.close();
      }
    }
  };
  </script>
  