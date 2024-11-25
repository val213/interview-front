<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div :class="cn('tailwind.config.jsflex tailwind.config.jsitems-center tailwind.config.jsp-6 tailwind.config.jspt-0', props.class)">
    <slot />
  </div>
</template>
