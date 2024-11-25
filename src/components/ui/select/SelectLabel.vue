<script setup>
import { cn } from '@/lib/utils';
import { SelectLabel } from 'radix-vue';

const props = defineProps({
  for: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});
</script>

<template>
  <SelectLabel
    :class="cn('tailwind.config.jspy-1.5 tailwind.config.jspl-8 tailwind.config.jspr-2 tailwind.config.jstext-sm tailwind.config.jsfont-semibold', props.class)"
  >
    <slot />
  </SelectLabel>
</template>
