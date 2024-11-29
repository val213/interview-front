<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// 使用 ref 创建一个响应式变量来存储输入的房间号
const roomNumber = ref('')
const router = useRouter()

// 处理创建面试房间的函数
const createInterviewRoom = () => {
  // 假设面试官 ID 是从 localStorage 获取
  const interviewerId = localStorage.getItem('interviewerId')
  // 重定向到创建房间的界面
  router.push(`/create?&interviewer=${interviewerId}`)
}

// 处理加入面试房间的函数
const joinInterviewRoom = () => {
  if (roomNumber.value.trim() !== '') {
    const interviewerId = localStorage.getItem('interviewerId')
    const interviewId = roomNumber.value
    
    // 重定向到包含面试官 ID 和面试 ID 的面试界面
    router.push(`/interview?interviewId=${interviewId}&interviewer=${interviewerId}`)
  } else {
    // 提示用户输入房间号
    alert('请输入提供的房间号')
  }
}
</script>

<template>
<div class="h-screen w-full flex items-center justify-center">
  <Card class="w-[100px] space-y-1 scale-125" style="width: 350px; height: 250px;">
    <CardHeader>
      <CardTitle class="text-center">你好！面试官</CardTitle>
      <!-- <CardDescription>请选择</CardDescription> -->
    </CardHeader>
    <CardContent>
      <form @submit.prevent="joinInterviewRoom">
        <div>
          <Input v-model="roomNumber" id="name" placeholder="请输入提供的房间号" />
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex flex-col space-y-2 items-center">
      <Button @click="createInterviewRoom" class="w-full">创建房间</Button>
      <Button @click="joinInterviewRoom" class="w-full">加入房间</Button>
    </CardFooter>
  </Card>
</div>
</template>