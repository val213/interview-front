<script setup>
import { cn } from '@/lib/utils';
import { DrawerOverlay } from 'vaul-vue';
import { computed } from 'vue';

const props = defineProps({
  forceMount: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DrawerOverlay
    v-bind="delegatedProps"
    :class="cn('tailwind.config.jsfixed tailwind.config.jsinset-0 tailwind.config.jsz-50 tailwind.config.jsbg-black/80', props.class)"
  />
</template>
