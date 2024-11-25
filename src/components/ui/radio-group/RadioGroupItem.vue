<script setup>
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-vue-next';
import {
  RadioGroupIndicator,
  RadioGroupItem,
  useForwardProps,
} from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  id: { type: String, required: false },
  value: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  name: { type: String, required: false },
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
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'tailwind.config.jsaspect-square tailwind.config.jsh-4 tailwind.config.jsw-4 tailwind.config.jsrounded-full tailwind.config.jsborder tailwind.config.jsborder-primary tailwind.config.jstext-primary tailwind.config.jsring-offset-background focus:tailwind.config.jsoutline-none focus-visible:tailwind.config.jsring-2 focus-visible:tailwind.config.jsring-ring focus-visible:tailwind.config.jsring-offset-2 disabled:tailwind.config.jscursor-not-allowed disabled:tailwind.config.jsopacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator class="tailwind.config.jsflex tailwind.config.jsitems-center tailwind.config.jsjustify-center">
      <Circle class="tailwind.config.jsh-2.5 tailwind.config.jsw-2.5 tailwind.config.jsfill-current tailwind.config.jstext-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
