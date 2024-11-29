<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from '@/components/ui/toast'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'

const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})

const formSchema = toTypedSchema(
  z.object({
    interviewType: z.string().refine(v => v, { message: '请选择面试形式' }),
    interviewDate: z.string().refine(v => v, { message: '请选择面试日志' }),
    // location: z.string().min(1, '请输入面试地点'),
    candidates: z.array(z.string()).min(1, '请选择至少一名面试者'),
  })
)


const interviewTypes = [
  {
    value: 'structured',
    label: '结构化面试',
  },
  {
    value: 'structured-group',
    label: '结构化小组',
  },
  {
    value: 'leaderless',
    label: '无领导小组讨论',
  },
]

const interviewees = ref([
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@example.com',
  },
])

const candidates = ref([
  { id: '1', name: '张三', avatar: '/avatars/1.png' },
  { id: '2', name: '李四', avatar: '/avatars/2.png' },
  { id: '3', name: '王五', avatar: '/avatars/3.png' },
  { id: '4', name: '赵六', avatar: '/avatars/4.png' },
  { id: '5', name: '孙七', avatar: '/avatars/5.png' },
])

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    interviewType: '',
    interviewDate: '',
    // location: '',
    candidates: [],
  },
})

const placeholder = ref()

const value = computed({
  get: () => (values.interviewDate ? parseDate(values.interviewDate) : undefined),
  set: (val) => val,
})

// 面试类型的更新属性
const selectedInterviewType = computed({
  get: () => values.interviewType,
  set: (val) => {
    setFieldValue('interviewType', val)
  },
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: '创建成功',
    description: '面试已成功创建，面试号为 #123456，将发送至面试者邮箱！',
  })
})

// In script section, update the toggleCandidate method:
const toggleCandidate = (candidateId) => {
  const currentCandidates = [...values.candidates]
  const index = currentCandidates.indexOf(candidateId)

  if (index > -1) {
    currentCandidates.splice(index, 1)
  } else {
    currentCandidates.push(candidateId)
  }

  setFieldValue('candidates', currentCandidates)
}
</script>

<template>
  <form @submit="onSubmit" class="h-screen overflow-hidden">
    <div class="flex w-full h-full p-4 gap-4">
      <Carousel class="w-[70%] scale-90">
        <CarouselContent>
          <CarouselItem v-for="(_, index) in 5" :key="index">
            <div class="p-1 h-[100vh]">
              <Card class="h-full">
                <CardContent class="flex items-center justify-center h-full p-4">
                  <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Card class="flex flex-col max-h-screen w-[30%]">
        <CardHeader>
          <CardTitle>创建面试房间</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6 flex-grow">
          <!-- 预选面试者确定、发起面试界面 -->
          <!-- 面试类型 -->
          <FormField name="interviewType">
            <FormItem>
              <FormLabel class="font-bold">面试类型</FormLabel>
              <FormControl>
                <Select v-model="selectedInterviewType">
                  <SelectTrigger>
                    <SelectValue placeholder="选择面试类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="type in interviewTypes" :key="type.value" :value="type.value">
                      <div>
                        <div>{{ type.label }}</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <!-- 面试日期 -->
          <!-- 日历组件有bug、需要修复 -->
          <FormField name="interviewDate">
            <FormItem>
              <FormLabel>面试日期：</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger as-child>
                    <Button variant="outline">
                      <span>
                        {{ value ? df.format(new Date(value.year, value.month - 1, value.day)) : '请选择面试日期' }}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                    <Calendar v-model:placeholder="placeholder" v-model="value" calendar-label="选择面试日期"
                      @update:model-value="(v) => {
                        if (v) {
                          setFieldValue('interviewDate', v.toString())
                        }
                        else {
                          setFieldValue('interviewDate', undefined)
                        }
                      }" 
                      class="rounded-md border calendar-background"/>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <!-- 面试者选择 -->
          <FormField name="interviewee">
            <FormItem>
              <FormLabel class="font-bold">面试者</FormLabel>
              <FormControl>
                <Select v-model="selectedInterviewType">
                  <SelectTrigger>
                    <SelectValue placeholder="选择面试者" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="interviewee in interviewees" :key="interviewee.id" :value="interviewee.id">
                      <div>
                        <div>{{ interviewee.name }}</div>
                        <div class="text-sm text-gray-500">{{ interviewee.email }}</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button type="submit" class="w-full">创建面试</Button>
        </CardFooter>
      </Card>
    </div>
  </form>
</template>



<style scoped>
.calendar-background {
  background-color: white; /* 设置背景色 */
}
</style>