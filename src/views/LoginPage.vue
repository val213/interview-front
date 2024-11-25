<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <Card class="w-full max-w-sm" style="width: 400px; height: 400px;">
    <CardHeader class="flex justify-center">
      <CardTitle class="text-center">
        登录面试子系统
      </CardTitle>
      <CardDescription class="text-center">
        输入您的账号和密码
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <form class="space-y-1">
        <div class="grid gap-2">
          <Label for="account">Accout</Label>
          <Input id="email" type="email" placeholder="your account" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" placeholder="your password" required />
        </div>
        <div class="flex flex-col space-y-2">
          <Label for="identity">Identity</Label>
          <Select>
            <SelectTrigger id="identity">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="interviewee">
                面试者
              </SelectItem>
              <SelectItem value="interviewer">
                面试官
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-center">
      <Button class="w-full">
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