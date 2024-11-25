<script setup>
import { cn } from '@/lib/utils';
import {
  SelectContent,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed } from 'vue';
import { SelectScrollDownButton, SelectScrollUpButton } from '.';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  forceMount: { type: Boolean, required: false },
  position: { type: String, required: false, default: 'popper' },
  bodyLock: { type: Boolean, required: false },
  side: { type: null, required: false },
  sideOffset: { type: Number, required: false },
  align: { type: null, required: false },
  alignOffset: { type: Number, required: false },
  avoidCollisions: { type: Boolean, required: false },
  collisionBoundary: { type: null, required: false },
  collisionPadding: { type: [Number, Object], required: false },
  arrowPadding: { type: Number, required: false },
  sticky: { type: String, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  updatePositionStrategy: { type: String, required: false },
  prioritizePosition: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});
const emits = defineEmits([
  'closeAutoFocus',
  'escapeKeyDown',
  'pointerDownOutside',
]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'tailwind.config.jsrelative tailwind.config.jsz-50 tailwind.config.jsmax-h-96 tailwind.config.jsmin-w-32 tailwind.config.jsoverflow-hidden tailwind.config.jsrounded-md tailwind.config.jsborder tailwind.config.jsbg-popover tailwind.config.jstext-popover-foreground tailwind.config.jsshadow-md data-[state=open]:tailwind.config.jsanimate-in data-[state=closed]:tailwind.config.jsanimate-out data-[state=closed]:tailwind.config.jsfade-out-0 data-[state=open]:tailwind.config.jsfade-in-0 data-[state=closed]:tailwind.config.jszoom-out-95 data-[state=open]:tailwind.config.jszoom-in-95 data-[side=bottom]:tailwind.config.jsslide-in-from-top-2 data-[side=left]:tailwind.config.jsslide-in-from-right-2 data-[side=right]:tailwind.config.jsslide-in-from-left-2 data-[side=top]:tailwind.config.jsslide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:tailwind.config.jstranslate-y-1 data-[side=left]:tailwind.config.js-translate-x-1 data-[side=right]:tailwind.config.jstranslate-x-1 data-[side=top]:tailwind.config.js-translate-y-1',
          props.class,
        )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport
        :class="
          cn(
            'tailwind.config.jsp-1',
            position === 'popper' &&
              'tailwind.config.jsh-[--radix-select-trigger-height] tailwind.config.jsw-full tailwind.config.jsmin-w-[--radix-select-trigger-width]',
          )
        "
      >
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
