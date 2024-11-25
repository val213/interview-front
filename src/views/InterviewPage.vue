<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast/use-toast'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CornerDownLeft, Paperclip, Mic } from 'lucide-vue-next'
import CameraIcon from '@/assets/camera.svg'

const router = useRouter()
const { toast } = useToast()
const videoRef = ref<HTMLVideoElement | null>(null)
const mediaStream = ref<MediaStream | null>(null)
const usingroomnumber = ref('')
const isCameraOn = ref(false)

// 示例聊天消息
const messages = ref<string[]>([])
const newMessage = ref('')

// 初始化房间号
onMounted(() => {
  usingroomnumber.value = localStorage.getItem('usingroomnumber') || ''
})

// 开始面试函数
const startInterview = async () => {
  try {
    // 如果已经有媒体流，先停止它
    if (mediaStream.value) {
      mediaStream.value.getTracks().forEach(track => track.stop())
      mediaStream.value = null
      isCameraOn.value = false
    }

    // 请求摄像头权限
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    const videoElement = videoRef.value

    if (videoElement) {
      videoElement.srcObject = stream
      videoElement.muted = true // 消除自动播放限制
      videoElement.playsInline = true // 确保在移动设备上内联播放
      await videoElement.play().catch(err => {
        console.error('视频播放错误:', err)
      })
    }

    mediaStream.value = stream
    isCameraOn.value = true

    toast({
      title: "Success",
      description: "摄像头已开启！",
      variant: "default"
    })
  } catch (error) {
    console.error('无法访问摄像头', error)
    toast({
      title: "Error",
      description: "无法访问摄像头",
      variant: "destructive"
    })
  }
}

// 停止面试函数
const stopInterview = () => {
  try {
    if (mediaStream.value) {
      mediaStream.value.getTracks().forEach(track => track.stop())
      mediaStream.value = null
    }
    if (videoRef.value) {
      videoRef.value.srcObject = null
    }
    isCameraOn.value = false

    toast({
      title: "Success",
      description: "本次面试已结束！",
      variant: "default"
    })

  } catch (error) {
    console.error('无法关闭摄像头', error)
    toast({
      title: "Error",
      description: "无法关闭摄像头",
      variant: "destructive"
    })
  }
}

// 发送消息函数
const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    messages.value.push(newMessage.value.trim())
    newMessage.value = ''
  }
}
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-background">
    <ResizablePanelGroup direction="horizontal" class="w-full">
      <!-- Video Panel -->
      <ResizablePanel :default-size="70" class="min-w-[400px]">
        <div class="h-full p-6">
          <Card class="flex h-full flex-col border-2">
            <CardHeader class="space-y-2 pb-4">
              <div class="flex items-center justify-between">
                <CardTitle class="text-2xl font-bold">视频面试</CardTitle>
                <span class="rounded-full bg-muted px-3 py-1 text-sm">
                  房间号：{{ usingroomnumber }}
                </span>
              </div>
            </CardHeader>
            
            <CardContent class="flex flex-1 flex-col gap-6 p-6">
              <div class="relative flex-1 overflow-hidden rounded-xl bg-slate-100">
                <video 
                  v-show="isCameraOn" 
                  ref="videoRef" 
                  autoplay 
                  muted 
                  playsinline 
                  class="h-full w-full rounded-xl object-cover transition-opacity duration-200"
                />
                <div v-show="!isCameraOn" 
                     class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <img :src="CameraIcon" alt="Camera Off" class="h-32 w-32 opacity-40" />
                  <p class="mt-4 text-sm text-muted-foreground">
                    摄像头未开启，请点击"开始面试"按钮
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <Button 
                  @click="startInterview"
                  class="flex-1 font-medium"
                  size="lg"
                  :disabled="isCameraOn"
                >
                  开始面试
                </Button>
                
                <Button 
                  @click="stopInterview"
                  variant="destructive"
                  class="flex-1 font-medium"
                  size="lg"
                  :disabled="!isCameraOn"
                >
                  结束面试
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <!-- Chat Panel -->
      <ResizablePanel :default-size="30" class="min-w-[300px]">
        <div class="h-full p-6">
          <Card class="flex h-full flex-col border-2">
            <CardHeader class="pb-4">
              <CardTitle>对话记录</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-1 flex-col gap-4">
              <div class="flex-1 overflow-y-auto">
                <div class="space-y-4 px-2">
                  <div v-for="(message, index) in messages" 
                       :key="index" 
                       class="rounded-lg bg-muted p-4 text-sm shadow-sm transition-all hover:bg-muted/80">
                    {{ message }}
                  </div>
                </div>
              </div>
              
              <div class="border-t pt-4">
                <form @submit.prevent="sendMessage" class="flex flex-col gap-3">
                  <Textarea
                    v-model="newMessage"
                    placeholder="输入消息..."
                    class="min-h-[100px] resize-none rounded-lg border-2 focus:border-primary"
                  />
                  <Button type="submit" class="w-full">
                    发送消息
                    <CornerDownLeft class="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<style scoped>
:deep(.resizable-handle) {
  width: 4px;
  background-color: #e5e7eb;
  transition: all 0.2s;
}

:deep(.resizable-handle:hover) {
  background-color: #d1d5db;
}
</style>