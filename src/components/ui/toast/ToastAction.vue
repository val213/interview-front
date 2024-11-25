<script setup>
import { cn } from '@/lib/utils';
import { ToastAction } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  altText: { type: String, required: true },
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
  <ToastAction
    v-bind="delegatedProps"
    :class="
      cn(
        'tailwind.config.jsinline-flex tailwind.config.jsh-8 tailwind.config.jsshrink-0 tailwind.config.jsitems-center tailwind.config.jsjustify-center tailwind.config.jsrounded-md tailwind.config.jsborder tailwind.config.jsbg-transparent tailwind.config.jspx-3 tailwind.config.jstext-sm tailwind.config.jsfont-medium tailwind.config.jsring-offset-background tailwind.config.jstransition-colors hover:tailwind.config.jsbg-secondary focus:tailwind.config.jsoutline-none focus:tailwind.config.jsring-2 focus:tailwind.config.jsring-ring focus:tailwind.config.jsring-offset-2 disabled:tailwind.config.jspointer-events-none disabled:tailwind.config.jsopacity-50 group-[.destructive]:tailwind.config.jsborder-muted/40 group-[.destructive]:hover:tailwind.config.jsborder-destructive/30 group-[.destructive]:hover:tailwind.config.jsbg-destructive group-[.destructive]:hover:tailwind.config.jstext-destructive-foreground group-[.destructive]:focus:tailwind.config.jsring-destructive',
        props.class,
      )
    "
  >
    <slot />
  </ToastAction>
</template>
