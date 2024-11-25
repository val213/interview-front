<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <h3
    :class="
      cn('tailwind.config.jstext-2xl tailwind.config.jsfont-semibold tailwind.config.jsleading-none tailwind.config.jstracking-tight', props.class)
    "
  >
    <slot />
  </h3>
</template>
