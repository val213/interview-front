<script setup>
import { cn } from '@/lib/utils';
import { ToastViewport } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  hotkey: { type: Array, required: false },
  label: { type: [String, Function], required: false },
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
  <ToastViewport
    v-bind="delegatedProps"
    :class="
      cn(
        'tailwind.config.jsfixed tailwind.config.jstop-0 tailwind.config.jsz-[100] tailwind.config.jsflex tailwind.config.jsmax-h-screen tailwind.config.jsw-full tailwind.config.jsflex-col-reverse tailwind.config.jsp-4 sm:tailwind.config.jsbottom-0 sm:tailwind.config.jsright-0 sm:tailwind.config.jstop-auto sm:tailwind.config.jsflex-col md:tailwind.config.jsmax-w-[420px]',
        props.class,
      )
    "
  />
</template>
