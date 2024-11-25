<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div :class="cn('tailwind.config.jsgrid tailwind.config.jsgap-1.5 tailwind.config.jsp-4 tailwind.config.jstext-center sm:tailwind.config.jstext-left', props.class)">
    <slot />
  </div>
</template>
