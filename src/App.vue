<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
const isAuthenticated = ref(false)
const router = useRouter()

</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <Toaster />
    <!-- <header>
      <h1>面试子系统</h1>
    </header> -->
    <main>
      <RouterView />
    </main>
  </div>
</template>