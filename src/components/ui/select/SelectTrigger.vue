<script setup>
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-vue-next';
import { SelectIcon, SelectTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  disabled: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'tailwind.config.jsflex tailwind.config.jsh-10 tailwind.config.jsw-full tailwind.config.jsitems-center tailwind.config.jsjustify-between tailwind.config.jsrounded-md tailwind.config.jsborder tailwind.config.jsborder-input tailwind.config.jsbg-background tailwind.config.jspx-3 tailwind.config.jspy-2 tailwind.config.jstext-sm tailwind.config.jsring-offset-background data-[placeholder]:tailwind.config.jstext-muted-foreground focus:tailwind.config.jsoutline-none focus:tailwind.config.jsring-2 focus:tailwind.config.jsring-ring focus:tailwind.config.jsring-offset-2 disabled:tailwind.config.jscursor-not-allowed disabled:tailwind.config.jsopacity-50 [&>span]:tailwind.config.jstruncate tailwind.config.jstext-start',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="tailwind.config.jsw-4 tailwind.config.jsh-4 tailwind.config.jsopacity-50 tailwind.config.jsshrink-0" />
    </SelectIcon>
  </SelectTrigger>
</template>
