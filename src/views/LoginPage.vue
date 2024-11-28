<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const router = useRouter()

const formSchema = toTypedSchema(z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  accountType: z.enum(['interviewer', 'interviewee'], {
    required_error: 'You need to select an account type.',
  }),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
    accountType: undefined,
  },
})

const onSubmit = form.handleSubmit((values) => {
  if (values.accountType === 'interviewer') {
    localStorage.setItem('role', 'interviewer')
    localStorage.setItem('interviewerId', values.email)
    router.push('/interviewer')
  } else if (values.accountType === 'interviewee') {
    localStorage.setItem('role', 'interviewee')
    localStorage.setItem('intervieweeId', values.email)
    router.push('/interviewee')
  }
})
</script>

<template>
  <Card class="w-[500px] min-h-[500px] p-6">
    <CardHeader class="space-y-2">
      <CardTitle class="text-2xl font-bold text-center">
        登录面试子系统
      </CardTitle>
      <CardDescription class="text-center text-base">
        输入您的账号和密码
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <FormField v-slot="{ field }" name="email">
          <FormItem>
            <FormLabel>账号</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="请输入凭证号" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="password">
          <FormItem>
            <FormLabel>密码</FormLabel>
            <FormControl>
              <Input type="password" v-bind="field" placeholder="请输入密码" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="accountType">
          <FormItem class="space-y-3">
            <FormLabel>选择身份</FormLabel>
            <FormControl>
              <RadioGroup v-bind="field" class="flex flex-col space-y-3">
                <FormItem class="flex items-center space-x-3">
                  <RadioGroupItem value="interviewer" />
                  <FormLabel class="font-normal">我是面试官</FormLabel>
                </FormItem>
                <FormItem class="flex items-center space-x-3">
                  <RadioGroupItem value="interviewee" />
                  <FormLabel class="font-normal">我是面试者</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </CardContent>

    <CardFooter class="pt-6">
      <Button type="submit" class="w-full h-11" @click="onSubmit">
        登录
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped>
.w-full {
  width: 100%;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.space-y-1> *+* {
  margin-top: 0.8rem;
}

.space-y-2> *+* {
  margin-top: 0.3rem;
}


.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.text-center {
  text-align: center;
}
</style>