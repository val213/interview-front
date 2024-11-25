export { default as Toast } from './Toast.vue';
export { default as ToastAction } from './ToastAction.vue';
export { default as ToastClose } from './ToastClose.vue';
export { default as ToastDescription } from './ToastDescription.vue';
export { default as Toaster } from './Toaster.vue';
export { default as ToastProvider } from './ToastProvider.vue';
export { default as ToastTitle } from './ToastTitle.vue';
export { default as ToastViewport } from './ToastViewport.vue';
export { toast, useToast } from './use-toast';

import { cva } from 'class-variance-authority';

export const toastVariants = cva(
  'tailwind.config.jsgroup tailwind.config.jspointer-events-auto tailwind.config.jsrelative tailwind.config.jsflex tailwind.config.jsw-full tailwind.config.jsitems-center tailwind.config.jsjustify-between tailwind.config.jsspace-x-4 tailwind.config.jsoverflow-hidden tailwind.config.jsrounded-md tailwind.config.jsborder tailwind.config.jsp-6 tailwind.config.jspr-8 tailwind.config.jsshadow-lg tailwind.config.jstransition-all data-[swipe=cancel]:tailwind.config.jstranslate-x-0 data-[swipe=end]:tailwind.config.jstranslate-x-[--radix-toast-swipe-end-x] data-[swipe=move]:tailwind.config.jstranslate-x-[--radix-toast-swipe-move-x] data-[swipe=move]:tailwind.config.jstransition-none data-[state=open]:tailwind.config.jsanimate-in data-[state=closed]:tailwind.config.jsanimate-out data-[swipe=end]:tailwind.config.jsanimate-out data-[state=closed]:tailwind.config.jsfade-out-80 data-[state=closed]:tailwind.config.jsslide-out-to-right-full data-[state=open]:tailwind.config.jsslide-in-from-top-full data-[state=open]:sm:tailwind.config.jsslide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'tailwind.config.jsborder tailwind.config.jsbg-background tailwind.config.jstext-foreground',
        destructive:
          'tailwind.config.jsdestructive tailwind.config.jsgroup tailwind.config.jsborder-destructive tailwind.config.jsbg-destructive tailwind.config.jstext-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
