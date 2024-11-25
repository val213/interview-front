<template>
    <div class="app-container">
      <h1>视频面试</h1>
      <header></header>
      <div class="content">
        <p>房间号：{{ usingroomnumber }}</p>
        <div class="camera-container">
          <video ref="videoRef" autoplay></video>
        </div>
        <div class="button-container">
          <button @click="startInterview" class="primary-button">开始面试</button>
          <button @click="stopInterview" class="danger-button">关闭面试</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        usingroomnumber: '',
        mediaStream: null
      };
    },
    mounted() {
      // 在页面加载时，从localStorage中获取usingroomnumber的值
      this.usingroomnumber = localStorage.getItem('usingroomnumber') || '';
    },
    methods: {
      startInterview() {
        // 在此处调用摄像头并在框内显示摄像头内容
        const videoElement = this.$refs.videoRef;
        const constraints = { video: true };
  
        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            videoElement.srcObject = stream;
            this.mediaStream = stream;
          })
          .catch(error => {
            console.error('无法访问摄像头', error);
          });
      },
      stopInterview() {
        // 停止摄像头流的获取
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach(track => {
            track.stop();
          });
        }
        this.$message.success("本次面试已结束，3秒后将返回首页");
        
        setTimeout(() => {
    this.$router.push("shouye");
  }, 3000); // 延迟5秒执行页面跳转
      }
    }
  };
  </script>
  <style>
  .content {
    margin-top: 20px;
  }
  
  .camera-container {
    width: 100%;
    max-width: 400px;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    overflow: hidden;
  }
  
  .camera-container video {
    width: 100%;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .primary-button {
    background-color: #4285f4;
    color: #ffffff;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .danger-button {
    background-color: #ea4335;
    color: #ffffff;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .app-container {
    background-color: #ffeeba;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  </style>
  <!-- <style>
  .content {
    margin-top: 20px;
  }
  
  .camera {
    width: 400px;
    height: 300px;
    border: 1px solid black;
  }
  </style> -->
<!-- <template>
    <div>
      <h1>面试页面</h1>
      <div class="content">
        <p>房间号：{{ usingroomnumber }}</p>
        <div class="camera">
          <video ref="videoRef" autoplay></video>
          <canvas ref="canvasRef"></canvas>
        </div>
        <button @click="startInterview">开始面试</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        usingroomnumber: ''
      };
    },
    mounted() {
      // 在页面加载时，从localStorage中获取usingroomnumber的值
      this.usingroomnumber = localStorage.getItem('usingroomnumber') || '';
    },
    methods: {
      startInterview() {
        // 在此处调用摄像头并在框内显示摄像头内容
        const videoElement = this.$refs.videoRef;
        const canvasElement = this.$refs.canvasRef;
        const constraints = { video: true };
  
        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            videoElement.srcObject = stream;
            const videoTrack = stream.getVideoTracks()[0];
            const videoSettings = videoTrack.getSettings();
            const { width, height } = videoSettings;
            canvasElement.width = width;
            canvasElement.height = height;
  
            const canvasContext = canvasElement.getContext('2d');
            setInterval(() => {
              canvasContext.drawImage(videoElement, 0, 0, width, height);
            }, 100);
          })
          .catch(error => {
            console.error('无法访问摄像头', error);
          });
      }
    }
  };
  </script>
  
  <style>
  .content {
    margin-top: 20px;
  }
  
  .camera {
    width: 400px;
    height: 300px;
    border: 1px solid black;
  }
  </style> -->