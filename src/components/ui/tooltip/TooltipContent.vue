<script setup>
import { cn } from '@/lib/utils';
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  forceMount: { type: Boolean, required: false },
  ariaLabel: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  side: { type: null, required: false },
  sideOffset: { type: Number, required: false, default: 4 },
  align: { type: null, required: false },
  alignOffset: { type: Number, required: false },
  avoidCollisions: { type: Boolean, required: false },
  collisionBoundary: { type: null, required: false },
  collisionPadding: { type: [Number, Object], required: false },
  arrowPadding: { type: Number, required: false },
  sticky: { type: String, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  class: { type: null, required: false },
});

const emits = defineEmits(['escapeKeyDown', 'pointerDownOutside']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'tailwind.config.jsz-50 tailwind.config.jsoverflow-hidden tailwind.config.jsrounded-md tailwind.config.jsborder tailwind.config.jsbg-popover tailwind.config.jspx-3 tailwind.config.jspy-1.5 tailwind.config.jstext-sm tailwind.config.jstext-popover-foreground tailwind.config.jsshadow-md tailwind.config.jsanimate-in tailwind.config.jsfade-in-0 tailwind.config.jszoom-in-95 data-[state=closed]:tailwind.config.jsanimate-out data-[state=closed]:tailwind.config.jsfade-out-0 data-[state=closed]:tailwind.config.jszoom-out-95 data-[side=bottom]:tailwind.config.jsslide-in-from-top-2 data-[side=left]:tailwind.config.jsslide-in-from-right-2 data-[side=right]:tailwind.config.jsslide-in-from-left-2 data-[side=top]:tailwind.config.jsslide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
