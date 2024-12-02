<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
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
import { CornerDownLeft, Paperclip, Mic } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import CameraIcon from '@/assets/camera.svg'

const router = useRouter()
const { toast } = useToast()
const usingroomnumber = ref('')
// 此刻是否有人（自己或者对方）打开了摄像头
const isCameraOn = ref(false)
const isRemoteVideoOn = ref(false)

// 示例聊天消息
const messages = ref([
  { sender: '系统消息', timestamp: 1833028400000, text: '面试即将开始，请双方做好准备！' },
])
const getVariant = (sender: string) => {
  if (sender === '面试官') return 'outline'
  if (sender === '系统消息') return 'secondary'
  return 'default'
}
const newMessage = ref('')
const roleMapping = {
  interviewer: '面试官',
  interviewee: '面试者',
}
const mediaStream = ref<MediaStream | null>(null)
// 业务身份
const userRole = ref(roleMapping[localStorage.getItem('role')] || '未知角色')
// webrtc 单向身份，默认接收者
const webrtcRole = ref('receiver')
// const localVideoRef = ref<HTMLVideoElement | null>(null)
// const remoteVideoRef = ref<HTMLVideoElement | null>(null)

// 初始化房间号，从 url 中获得
onMounted(() => {
  usingroomnumber.value = getQueryParam('interviewId') || ''
  fetchInterviewMetadata()
  connectWebSocket()
  init()
})

const sendMessage = (message, sender) => {
  if (message.trim() !== '') {
    const now = new Date()
    const formattedDate = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-').replace(',', '')

    const messageData = {
      type: 'chat',
      content: message.trim(),
      sendAt: formattedDate,
      senderName: sender
    }

    if (websocket) {
      console.log('Sending ' + messageData.type + ' message:', messageData)
      websocket.send(JSON.stringify(messageData))
    }

    messages.value.push({
      sender: sender,
      timestamp: Date.now(),
      text: message.trim()
    })
    newMessage.value = '' // 清空输入区域
  }
}

const connectWebSocket = () => {
  console.log('Connecting to WebSocket...');
  websocket = new WebSocket('ws://localhost:8080/chat');
  websocket.onopen = () => {
    console.log('WebSocket connection opened');
  };
  websocket.onmessage = async (event) => {
    const messageData = JSON.parse(event.data);
    console.log('WebSocket message received:', messageData);
    if (messageData.type === 'chat') {
      console.log('Received chat message:', messageData);
      if (messageData.senderName !== userRole.value) {
        messages.value.push({
          sender: messageData.senderName,
          timestamp: new Date(messageData.sendAt).getTime(),
          text: messageData.content,
        });
      }
    }
  };
  websocket.onclose = () => {
    console.log('WebSocket connection closed');
  };
  websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

// （面试者）开始面试函数
const startInterview = async () => {
  try {
    webrtcRole.value = 'sender'
    createOffer()
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
    // if (localVideoRef.value) {
    //   localVideoRef.value.srcObject = null
    // }
    isCameraOn.value = false

    toast({
      title: "Success",
      description: "本次面试已结束！",
      variant: "default"
    })
    if (localStorage.getItem('role') === 'interviewer') {
      redirectToInterviewResult(
        getQueryParam('interviewId') || '',
        localStorage.getItem('interviewerId') || ''
      )
    } else {
      router.push('/interviewee?intervieweeId=' + localStorage.getItem('intervieweeId'))
    }
  } catch (error) {
    console.error('无法关闭摄像头', error)
    toast({
      title: "Error",
      description: "无法关闭摄像头",
      variant: "destructive"
    })
  }
}

const redirectToInterviewResult = (interviewId: string, interviewer: string) => {
  const baseUrl = 'http://localhost:5173/result?'
  const url = new URL(baseUrl)
  url.searchParams.append('interviewId', interviewId)
  url.searchParams.append('interviewer', interviewer)

  window.location.href = url.toString()
}

function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

const interviewMetadata = ref({
  interviewId: '',
  interviewer: '',
  interviewee: ''
})

function fetchInterviewMetadata() {
  interviewMetadata.value = {
    interviewId: getQueryParam('interviewId'),
    interviewer: getQueryParam('interviewer'),
    interviewee: getQueryParam('interviewee')
  }
}

const handleSubmit = () => {
  sendMessage(newMessage.value, userRole.value)
}


import { io } from 'socket.io-client';

const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.voipbuster.com ' }],
});

let localStream: MediaStream;
let remoteStream: MediaStream;


const offerSdp = ref('');
const answerSdp = ref('');
const offerSdp2 = ref('');
const answerSdp2 = ref('');
const socket = io('http://localhost:3000');
let websocket : WebSocket | null = null
const init = async () => {

  const remoteVideo = document.getElementById('remote') as HTMLVideoElement;
  socket.on('connect', () => {
    console.log('client connect!');
  });

  socket.on('getoffer', (offer) => {
    offerSdp2.value = offer;
    isCameraOn.value = true;
    createAnswer();
  });

  socket.on('getanswer', (answer) => {
    answerSdp2.value = answer;
    addAnswer();
  });

  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };
};

const createOffer = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  const localVideo = document.getElementById('local') as HTMLVideoElement;
  localVideo.srcObject = localStream;

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      offerSdp.value = JSON.stringify(pc.localDescription);
      sendOffer(offerSdp.value);
    }
  };
};

const createAnswer = async () => {
  const offer = JSON.parse(offerSdp2.value);
  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      answerSdp.value = JSON.stringify(pc.localDescription);
      sendAnswer(answerSdp.value);
    }
  };
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
};

const addAnswer = async () => {
  const answer = JSON.parse(answerSdp2.value);
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(answer);
  }
};

const copyToClipboard = (val: string) => {
  navigator.clipboard.writeText(val);
};

const sendOffer = async (offer: string) => {
  socket.emit('sendoffer', offer);
};

const sendAnswer = async (answer: string) => {
  socket.emit('sendanswer', answer);
};

</script>

<template>
  <div class="flex w-full h-screen p-4 gap-4">
    <ResizablePanelGroup
      id="handle-demo-group-1"
      direction="horizontal"
      class="h-full w-full rounded-lg border"
    >
      <!-- Video Panel -->
      <ResizablePanel id="handle-demo-panel-1" :default-size="50">
          <Card class="flex w-full h-full flex-col border-2">
            <CardHeader class="space-y-2 pb-4">
              <div class="flex items-center justify-between">
                <CardTitle class="text-2xl font-bold">视频面试</CardTitle>
                <span class="rounded-full bg-muted px-3 py-1 text-sm">
                  房间号：{{ usingroomnumber }}
                </span>
                <span class="rounded-full bg-muted px-3 py-1 text-sm">
                  角色：{{ userRole }}
                </span>
              </div>
            </CardHeader>
            
            <CardContent class="flex flex-1 flex-col gap-6 p-6 h-full">
              <div class="relative flex-1 overflow-hidden rounded-xl bg-slate-100">
                <div v-show="isCameraOn" 
                    class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <video
                  v-show="isCameraOn && webrtcRole === 'sender'" 
                  id="local"
                  autoplay 
                  muted 
                  playsinline 
                  class="w-full h-auto max-h-full object-cover rounded-xl transition-opacity duration-200"
                />
                <p v-show="isCameraOn && webrtcRole === 'sender'" class="absolute top-0 left-0 w-full text-center text-sm text-muted-foreground mt-2">
                  您正在分享摄像头画面
                </p>
                <video
                  v-show="isCameraOn && webrtcRole === 'receiver'" 
                  id="remote" 
                  autoplay 
                  muted 
                  playsinline 
                  class="w-full h-auto max-h-full object-cover rounded-xl transition-opacity duration-200"
                />
                <p v-show="isCameraOn && webrtcRole === 'receiver'" class="absolute top-0 left-0 w-full text-center text-sm text-muted-foreground mt-2">
                  您正在接受对方的摄像头画面
                </p>
                </div>
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
                >
                  结束面试
                </Button>
              </div>
            </CardContent>
          </Card>
      </ResizablePanel>

      <ResizableHandle id="handle-demo-handle-1" with-handle />

      <!-- Chat Panel -->
      <ResizablePanel id="handle-demo-panel-2" :default-size="50">
          <Card class="flex w-full h-full flex-col border-2">
            <CardHeader class="pb-4">
              <CardTitle>对话记录</CardTitle>
            </CardHeader>
            <!-- 消息显示区域 -->
            <div class="flex flex-col h-full">
              <div class="space-y-4">
                <CardContent class="flex flex-1 flex-col gap-4 h-full">
                    <div class="flex-1 overflow-y-auto">
                      <div class="space-y-4 px-2">
                        <div v-for="(message, index) in messages" 
                             :key="index" 
                             class="flex flex-col space-y-1">
                            <div :class="{
                            'text-left': message.sender !== userRole && message.sender !== '系统消息',
                            'text-right': message.sender === userRole && message.sender !== '系统消息',
                            'text-center': message.sender === '系统消息'
                          }">
                          <div class="text-xs text-gray-500">
                            {{ message.sender }} - {{ new Date(message.timestamp).toLocaleString() }}
                          </div>
                            <Badge :variant="getVariant(message.sender)">
                              {{ message.text }}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
              </div>
            </div>
            <!-- 消息输入区域 -->
            <div class="p-4 border-t mt-auto">
              <CardContent class="border-t pt-4">
                    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
                      <Textarea
                        v-model="newMessage"
                        placeholder="输入消息，友好交流..."
                        class="min-h-[100px] resize-none rounded-lg border-2 focus:border-primary"
                     />
                      <Button type="submit" class="w-full">
                        发送消息
                        <CornerDownLeft class="ml-2 h-4 w-4" />
                      </Button> 
                    </form>
                  </CardContent>
            </div>
          </Card>
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

.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
</style>