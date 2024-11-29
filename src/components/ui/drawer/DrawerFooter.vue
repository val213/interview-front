<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div :class="cn('tailwind.config.jsmt-auto tailwind.config.jsflex tailwind.config.jsflex-col tailwind.config.jsgap-2 tailwind.config.jsp-4', props.class)">
    <slot />
  </div>
</template>
