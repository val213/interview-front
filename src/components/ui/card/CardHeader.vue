<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div :class="cn('tailwind.config.jsflex tailwind.config.jsflex-col tailwind.config.jsgap-y-1.5 tailwind.config.jsp-6', props.class)">
    <slot />
  </div>
</template>
