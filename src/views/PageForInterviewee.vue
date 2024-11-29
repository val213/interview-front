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

// 处理加入面试房间的函数
const joinInterviewRoom = () => {
  if (roomNumber.value.trim() !== '') {
    // 面试者 ID 是获取当前的localStorage中的 intervieweeId
    // 面试房间号是输入的房间号
    const intervieweeId = localStorage.getItem('intervieweeId')
    const interviewId = roomNumber.value
    
    // 重定向到包含面试者 ID 和面试 ID 的面试界面
    router.push(`/interview?interviewId=${interviewId}&intervieweeId=${intervieweeId}`)
  } else {
    // 提示用户输入房间号
    alert('请输入面试官提供的房间号')
  }
}
</script>

<template>
<div class="h-screen w-full flex items-center justify-center">
  <Card class="w-[400px] h-[200px] space-y-1 scale-125">
    <CardHeader>
      <CardTitle class="text-center">你好！面试者</CardTitle>
      <!-- <CardDescription>请选择</CardDescription> -->
    </CardHeader>
    <form @submit.prevent="joinInterviewRoom">
    <CardContent>
      <div>
        <Input v-model="roomNumber" id="name" placeholder="请输入面试官提供的房间号" />
      </div>
    </CardContent>
    <CardFooter class="flex flex-col items-center">
      <Button type="submit" class="w-full">加入面试房间</Button>
    </CardFooter>
  </form>
  </Card>
</div>
</template>
