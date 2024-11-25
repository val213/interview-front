<script setup>
import { cn } from '@/lib/utils';
import { Label } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  for: { type: String, required: false },
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
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'tailwind.config.jstext-sm tailwind.config.jsfont-medium tailwind.config.jsleading-none peer-disabled:tailwind.config.jscursor-not-allowed peer-disabled:tailwind.config.jsopacity-70',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
