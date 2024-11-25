<script setup>
import { cn } from '@/lib/utils';
import { X } from 'lucide-vue-next';
import { ToastClose } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
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
  <ToastClose
    v-bind="delegatedProps"
    :class="
      cn(
        'tailwind.config.jsabsolute tailwind.config.jsright-2 tailwind.config.jstop-2 tailwind.config.jsrounded-md tailwind.config.jsp-1 tailwind.config.jstext-foreground/50 tailwind.config.jsopacity-0 tailwind.config.jstransition-opacity hover:tailwind.config.jstext-foreground focus:tailwind.config.jsopacity-100 focus:tailwind.config.jsoutline-none focus:tailwind.config.jsring-2 group-hover:tailwind.config.jsopacity-100 group-[.destructive]:tailwind.config.jstext-red-300 group-[.destructive]:hover:tailwind.config.jstext-red-50 group-[.destructive]:focus:tailwind.config.jsring-red-400 group-[.destructive]:focus:tailwind.config.jsring-offset-red-600',
        props.class,
      )
    "
  >
    <X class="tailwind.config.jsh-4 tailwind.config.jsw-4" />
  </ToastClose>
</template>
