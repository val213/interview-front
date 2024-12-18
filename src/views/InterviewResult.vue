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
import router from '@/router'

// 定义表单验证模式
const formSchema = toTypedSchema(z.object({
  intervieweeId: z.string().min(1, "请输入面试者ID"),
  position: z.string().min(1, "请输入应聘岗位"),
  comprehensiveScore: z.coerce.number().min(0).max(100, "分数范围0-100"),
  languageExpression: z.coerce.number().min(0).max(20, "分数范围0-20"),
  logicalThinking: z.coerce.number().min(0).max(20, "分数范围0-20"),
  situationalResponse: z.coerce.number().min(0).max(20, "分数范围0-20"),
  professionalKnowledge: z.coerce.number().min(0).max(20, "分数范围0-20"),
  personalQuality: z.coerce.number().min(0).max(20, "分数范围0-20"),
  comments: z.string().min(10, "评语至少10字").max(500, "评语最多500字"),
}))

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    intervieweeId: '',
    comprehensiveScore: 0,
    languageExpression: 0,
    logicalThinking: 0,
    situationalResponse: 0,
    professionalKnowledge: 0,
    personalQuality: 0,
    comments: '',
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
function formatDateTime(date: Date): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

const showConfirmDialog = () => {
  return window.confirm('提交成功！是否返回首页？')
}

const onSubmit = async (formValues: any) => {
  console.log('表单提交触发');
  console.log('表单数据:', formValues);
  try {
    console.log('表单提交触发');
    console.log('表单数据:', formValues);

    // 验证分数
    const totalScore = 
      Number(formValues.languageExpression) +
      Number(formValues.logicalThinking) +
      Number(formValues.situationalResponse) +
      Number(formValues.professionalKnowledge) +
      Number(formValues.personalQuality);

    console.log('总分:', totalScore);

    if (totalScore !== Number(formValues.comprehensiveScore)) {
      toast({
        title: '分数错误',
        description: '各项分数之和必须等于总分',
      });
      return;
    }

    const requestBody = {
      interviewId: interviewMetadata.value.interviewId,
      intervieweeId: formValues.intervieweeId,
      interviewerId: interviewMetadata.value.interviewer,
      position: formValues.position,
      comprehensiveScore: Number(formValues.comprehensiveScore),
      languageExpression: Number(formValues.languageExpression),
      logicalThinking: Number(formValues.logicalThinking),
      situationalResponse: Number(formValues.situationalResponse),
      professionalKnowledge: Number(formValues.professionalKnowledge),
      personalQuality: Number(formValues.personalQuality),
      comments: formValues.comments,
      createdAt: formatDateTime(new Date()),
      updatedAt: formatDateTime(new Date()) 
    };

    console.log('准备发送请求:', requestBody);

    // 配置axios基础URL（如果需要）
    axios.defaults.baseURL = 'http://localhost:8080';

    const response = await axios.post('/evaluation/add', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('服务器响应:', response);

    if (response.data) {
      toast({
        title: '提交成功',
        description: '面试评价已保存'
      });

      // Show confirmation and handle navigation
      if (showConfirmDialog()) {
        // Assuming the interviewer homepage route is '/interviewer/home'
        router.push('/interviewer?interviewId=' + interviewMetadata.value.interviewId);
      }
    }
  } catch (error) {
    console.error('提交失败:', error);
    toast({
      title: '提交失败',
      description: error.message || '保存失败，请重试'
    });
  }
  
}

// Define submitForm using handleSubmit
const submitForm = handleSubmit(onSubmit);

onMounted(() => {
  fetchInterviewMetadata();
});
</script>

<template>
  <div class="flex w-full min-h-screen bg-gray-50">
    <form @submit.prevent="submitForm" class="w-full max-w-3xl mx-auto my-4">
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
        <!-- 面试岗位 -->
        <FormField v-slot="{ field }" name="position">
          <FormItem>
            <FormLabel>应聘岗位</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="请输入应聘岗位" />
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
                class="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full">
          提交评价
        </Button>
      </CardFooter>
    </Card>
  </form>
  </div>
</template>