<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div
    :class="
      cn(
        'tailwind.config.jsrounded-lg tailwind.config.jsborder tailwind.config.jsbg-card tailwind.config.jstext-card-foreground tailwind.config.jsshadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
