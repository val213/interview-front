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
  <Card class="w-[100px] space-y-1" style="width: 350px; height: 200px;">
    <CardHeader>
      <CardTitle class="text-center">你好！面试者</CardTitle>
      <!-- <CardDescription>请选择</CardDescription> -->
    </CardHeader>
    <form @submit.prevent="joinInterviewRoom">
    <CardFooter class="flex flex-col space-y-2 items-center">
      <div>
        <Input v-model="roomNumber" style="width: 107%;" id="name" placeholder="请输入面试官提供的房间号" />
      </div>
      <Button type="submit" class="w-full">加入面试房间</Button>
    </CardFooter>
  </form>
  </Card>
</template>

<style scoped>
.flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.flex-col {
  flex-direction: column;
}   
.items-center {
  align-items: center;
}
.text-center {
  text-align: center;
}
.w-full {
  width: 30%;
}
.space-y-1 > * + * {
  margin-top: 1rem; /* 添加垂直间距 */
}
.space-y-2 > * + * {
  margin-top: 1.5rem; /* 添加垂直间距 */
}
</style>