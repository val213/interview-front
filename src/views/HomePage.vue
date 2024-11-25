<template>
  <div class="app-container">
    <div id="shouye">
      <h1>欢迎使用面试系统</h1>
      <Sched />
      <Header></Header>
      <div class="buttons">
        <el-button type="primary" @click="createroom">创建房间</el-button>
        <el-button type="primary" @click="test">加入面试</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sched from '../components/sched.vue'


const router = useRouter()
const roomnumber = ref('')

function test() {
  router.push('/interview')
}

function createroom() {
  axios.post('http://localhost:8080/api/interview/createroom', 1)
    .then(response => {
      localStorage.setItem('reply', response.data)
      roomnumber.value = response.data.data
      navigator.clipboard.writeText(roomnumber.value)
      alert(`创建房间成功，房间号已经复制到粘贴板：${roomnumber.value}`)
      setTimeout(() => {
        router.push('/interview')
      }, 3000)
    })
    .catch(error => {
      console.error('请求发送失败', error)
    })
}
</script>

<style scoped>
.app-container {
  background-color: #ffeeaf;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#MainPage {
  text-align: center;
  padding: 20px;
}
.buttons {
  margin-top: 20px;
}
</style>