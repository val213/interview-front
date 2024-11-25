<script setup>
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
  <Card class="w-[100px] space-y-1" style="width: 350px; height: 200px;">
    <CardHeader>
      <CardTitle class="text-center">你好！面试官</CardTitle>
      <!-- <CardDescription>请选择</CardDescription> -->
    </CardHeader>
    <CardFoot class="flex flex-col space-y-2 items-center">
        <Button class="w-full">创建面试房间</Button>
        <Button class="w-full">加入面试房间</Button>
    </CardFoot>
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