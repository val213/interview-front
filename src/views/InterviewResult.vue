<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import axios from 'axios';
import { onMounted, ref } from 'vue'

// 确保导入 Card 组件
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

// 定义表单验证模式
const formSchema = toTypedSchema(z.object({
  intervieweeId: z.string().min(1, "请输入面试者ID"),
  comprehensiveScore: z.number().min(0).max(100, "分数范围0-100"),
  // 各评分维度
  languageExpression: z.number().min(0).max(20, "分数范围0-20"),
  logicalThinking: z.number().min(0).max(20, "分数范围0-20"),
  situationalResponse: z.number().min(0).max(20, "分数范围0-20"), 
  professionalKnowledge: z.number().min(0).max(20, "分数范围0-20"),
  personalQuality: z.number().min(0).max(20, "分数范围0-20"),
  comments: z.string().min(10, "评语至少10字").max(500, "评语最多500字"),
  suggestions: z.string().max(200, "建议最多200字").optional(),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    intervieweeId: '',
    comprehensiveScore: 0,
    languageExpression: 0,
    logicalThinking: 0,
    situationalResponse: 0,
    professionalKnowledge: 0, 
    personalQuality: 0,
    comments: ''
  }
})

const interviewMetadata = ref({
  interviewId: '',
  interviewDate: '',
  interviewer: ''
});

function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function fetchInterviewMetadata() {
  // 从 URL 参数获取面试元数据
  interviewMetadata.value = {
    interviewId: getQueryParam('interviewId'),
    interviewDate: getQueryParam('interviewDate'),
    interviewer: getQueryParam('interviewer')
  };
}

function onSubmit(values: any) {
  // 确保 onSubmit 被调用
  console.log('onSubmit 被调用');
  
  // 打印表单数据
  console.log('表单数据:', values);
  
  // 调用 toast 显示表单数据
  toast({
    title: '表单数据',
    description: JSON.stringify(values, null, 2),
  });
  
  // 调用后台 API 保存评价
  axios.post('/api/saveEvaluation', values)
    .then(response => {
      console.log(response.data.message);
      // 提示用户提交成功
      toast({
        title: '提交成功',
        description: '面试评价已保存',
      });
    })
    .catch(error => {
      console.error('There was an error saving the evaluation:', error);
    });
}

onMounted(() => {
  fetchInterviewMetadata();
});
</script>

<template>
  <div class="flex w-full min-h-screen bg-gray-50">
    <form @submit.prevent="form.handleSubmit(onSubmit)" class="w-full max-w-3xl mx-auto my-4">
    <Card class="p-6">
      <CardHeader class="space-y-1 pb-4">
        <CardTitle>面试评价表</CardTitle>
        <CardDescription>请对本次面试进行综合评价</CardDescription>
      </CardHeader>

      <CardContent class="space-y-6">
        <!-- 面试场次消息 -->
        <FormField v-slot="{ field }" name="interviewId">
          <FormItem>
            <FormLabel>面试场次：</FormLabel>
            <FormControl>
              <!-- 面试结束后进入表单的时候，自动捕获面试的元数据 -->
              <input  v-model="interviewMetadata.interviewId" readonly />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field }" name="interviewer">
          <FormItem>
            <FormLabel>面试官：</FormLabel>
            <FormControl>
              <input  v-model="interviewMetadata.interviewer" readonly />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- 面试者信息 -->
        <FormField v-slot="{ field }" name="intervieweeId">
          <FormItem>
            <FormLabel>面试者ID</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="请输入面试者ID" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- 评分维度 -->
        <div class="grid grid-cols-2 gap-6">
          <FormField v-slot="{ field }" name="languageExpression">
            <FormItem>
              <FormLabel>语言表达（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估表达的准确性、流畅性和感染力</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="logicalThinking">
            <FormItem>
              <FormLabel>逻辑思维（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估分析问题和解决问题的能力</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="situationalResponse">
            <FormItem>
              <FormLabel>情景应变（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估处理突发情况的应变能力</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="professionalKnowledge">
            <FormItem>
              <FormLabel>专业知识（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估岗位相关的专业知识储备</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="personalQuality">
            <FormItem>
              <FormLabel>个人素质（20分）</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="20" />
              </FormControl>
              <FormDescription>评估思想品德、心理素质等综合素养</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="comprehensiveScore">
            <FormItem>
              <FormLabel>综合得分</FormLabel>
              <FormControl>
                <Input type="number" v-bind="field" min="0" max="100" />
              </FormControl>
              <FormDescription>面试总分（满分100分）</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- 评语和建议 -->
        <FormField v-slot="{ field }" name="comments">
          <FormItem>
            <FormLabel>详细评语</FormLabel>
            <FormControl>
              <Textarea 
                v-bind="field" 
                placeholder="请详细描述面试者的表现..."
                class="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full">提交评价</Button>
      </CardFooter>
    </Card>
  </form>
  </div>
</template>