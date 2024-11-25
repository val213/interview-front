<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter()

function login() {
  isAuthenticated.value = true
  router.push('/home')
}
</script>

<template>
  <div>
    <header>
      <h1>面试子系统</h1>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  background-color: #42b983;
  color: white;
  padding: 1em;
  text-align: center;
}
main {
  padding: 2em;
}
</style>
