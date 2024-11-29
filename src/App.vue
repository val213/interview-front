<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
const isAuthenticated = ref(false)
const router = useRouter()
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

</script>

<template>
  <div class="w-screen h-screen">
    <Toaster />
    <main>
      <RouterView class="w-full h-full"></RouterView>
    </main>
  </div>
</template>
