<template>
  <div class="app-container">
    <div class="header-container">
      <h1>面试选择</h1>
    </div>

    <el-form :model="formData" label-position="top" class="interview-form">
      <!-- 房间信息 -->
      <el-form-item label="房间号" required>
        <el-input v-model="formData.roomNumber" placeholder="请输入房间号" />
      </el-form-item>

      <!-- 面试类型 -->
      <el-form-item label="面试类型">
        <el-radio-group v-model="formData.roomType">
          <el-radio label="individual">个人面试</el-radio>
          <el-radio label="group">群面</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 面试时长 -->
      <el-form-item label="预计时长">
        <el-select v-model="formData.duration" placeholder="请选择面试时长">
          <el-option label="30分钟" value="30" />
          <el-option label="45分钟" value="45" />
          <el-option label="60分钟" value="60" />
          <el-option label="90分钟" value="90" />
        </el-select>
      </el-form-item>

      <!-- 面试方式选择 -->
      <div class="interview-mode">
        <el-card class="mode-card" :class="{ active: formData.mode === 'video' }" @click="selectMode('video')">
          <template #header>
            <div class="mode-header">
              <el-icon><VideoCamera /></el-icon>
              <span>视频面试</span>
            </div>
          </template>
          <div class="mode-content">支持视频、音频和屏幕共享</div>
        </el-card>

        <el-card class="mode-card" :class="{ active: formData.mode === 'audio' }" @click="selectMode('audio')">
          <template #header>
            <div class="mode-header">
              <el-icon><Microphone /></el-icon>
              <span>语音面试</span>
            </div>
          </template>
          <div class="mode-content">仅支持音频交流</div>
        </el-card>
      </div>

      <!-- 操作按钮 -->
      <div class="buttons">
        <el-button type="primary" @click="submit" :disabled="!isFormValid">
          开始面试
        </el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { VideoCamera, Microphone } from '@element-plus/icons-vue'

const router = useRouter()

const formData = ref({
  roomNumber: '',
  roomType: 'individual',
  duration: '30',
  mode: ''
})

const isFormValid = computed(() => {
  return formData.value.roomNumber && formData.value.mode
})

const selectMode = (mode) => {
  formData.value.mode = mode
}

const submit = () => {
  if (!isFormValid.value) {
    ElMessage.warning('请填写完整信息')
    return
  }
  const path = formData.value.mode === 'video' ? '/video-interview' : '/audio-interview'
  router.push({
    path,
    query: { ...formData.value }
  })
}

const reset = () => {
  formData.value = {
    roomNumber: '',
    roomType: 'individual',
    duration: '30',
    mode: ''
  }
}
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
}

.interview-form {
  margin-top: 2em;
}

.interview-mode {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 2em 0;
}

.mode-card {
  cursor: pointer;
  transition: all 0.3s;
}

.mode-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.mode-card.active {
  border: 2px solid var(--el-color-primary);
}

.mode-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mode-content {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 2em;
}
</style>