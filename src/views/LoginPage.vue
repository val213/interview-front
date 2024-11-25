<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const role = ref('')

function login() {
  if (username.value && password.value && role.value) {
    router.push('/home')
  } else {
    alert('请填写所有字段')
  }
}
</script>

<template>
  <div>
    <h2>登录</h2>
    <div>
      <label>
        <input type="radio" v-model="role" value="interviewee" />
        面试者
      </label>
      <label>
        <input type="radio" v-model="role" value="interviewer" />
        面试官
      </label>
    </div>
    <div>
      <input v-model="username" placeholder="用户名" />
    </div>
    <div>
      <input v-model="password" type="password" placeholder="密码" />
    </div>
    <button @click="login">登录</button>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 1em;
}
label {
  margin-right: 1em;
}
button {
  padding: 0.5em 1em;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #369f6b;
}
</style>