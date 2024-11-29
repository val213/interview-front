<script setup>
import { cn } from '@/lib/utils';
import { useForwardPropsEmits } from 'radix-vue';
import { DrawerContent, DrawerPortal } from 'vaul-vue';
import DrawerOverlay from './DrawerOverlay.vue';

const props = defineProps({
  forceMount: { type: Boolean, required: false },
  trapFocus: { type: Boolean, required: false },
  disableOutsidePointerEvents: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});
const emits = defineEmits([
  'escapeKeyDown',
  'pointerDownOutside',
  'focusOutside',
  'interactOutside',
  'openAutoFocus',
  'closeAutoFocus',
]);

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded"
      :class="
        cn(
          'tailwind.config.jsfixed tailwind.config.jsinset-x-0 tailwind.config.jsbottom-0 tailwind.config.jsz-50 tailwind.config.jsmt-24 tailwind.config.jsflex tailwind.config.jsh-auto tailwind.config.jsflex-col tailwind.config.jsrounded-t-[10px] tailwind.config.jsborder tailwind.config.jsbg-background',
          props.class,
        )
      "
    >
      <div class="tailwind.config.jsmx-auto tailwind.config.jsmt-4 tailwind.config.jsh-2 tailwind.config.jsw-[100px] tailwind.config.jsrounded-full tailwind.config.jsbg-muted" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
