<script setup>
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-vue-next';
import { SplitterResizeHandle, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  id: { type: String, required: false },
  hitAreaMargins: { type: Object, required: false },
  tabindex: { type: Number, required: false },
  disabled: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  withHandle: { type: Boolean, required: false },
});
const emits = defineEmits(['dragging']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SplitterResizeHandle
    v-bind="forwarded"
    :class="
      cn(
        'tailwind.config.jsrelative tailwind.config.jsflex tailwind.config.jsw-px tailwind.config.jsitems-center tailwind.config.jsjustify-center tailwind.config.jsbg-border after:tailwind.config.jsabsolute after:tailwind.config.jsinset-y-0 after:tailwind.config.jsleft-1/2 after:tailwind.config.jsw-1 after:tailwind.config.js-translate-x-1/2 focus-visible:tailwind.config.jsoutline-none focus-visible:tailwind.config.jsring-1 focus-visible:tailwind.config.jsring-ring focus-visible:tailwind.config.jsring-offset-1 [&[data-orientation=vertical]]:tailwind.config.jsh-px [&[data-orientation=vertical]]:tailwind.config.jsw-full [&[data-orientation=vertical]]:after:tailwind.config.jsleft-0 [&[data-orientation=vertical]]:after:tailwind.config.jsh-1 [&[data-orientation=vertical]]:after:tailwind.config.jsw-full [&[data-orientation=vertical]]:after:tailwind.config.js-translate-y-1/2 [&[data-orientation=vertical]]:after:tailwind.config.jstranslate-x-0 [&[data-orientation=vertical]>div]:tailwind.config.jsrotate-90',
        props.class,
      )
    "
  >
    <template v-if="props.withHandle">
      <div
        class="tailwind.config.jsz-10 tailwind.config.jsflex tailwind.config.jsh-4 tailwind.config.jsw-3 tailwind.config.jsitems-center tailwind.config.jsjustify-center tailwind.config.jsrounded-sm tailwind.config.jsborder tailwind.config.jsbg-border"
      >
        <GripVertical class="tailwind.config.jsh-2.5 tailwind.config.jsw-2.5" />
      </div>
    </template>
  </SplitterResizeHandle>
</template>
