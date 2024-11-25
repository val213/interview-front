<script setup>
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-vue-next';
import { SelectScrollDownButton, useForwardProps } from 'radix-vue';
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

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    :class="
      cn('tailwind.config.jsflex tailwind.config.jscursor-default tailwind.config.jsitems-center tailwind.config.jsjustify-center tailwind.config.jspy-1', props.class)
    "
  >
    <slot>
      <ChevronDown class="tailwind.config.jsh-4 tailwind.config.jsw-4" />
    </slot>
  </SelectScrollDownButton>
</template>
