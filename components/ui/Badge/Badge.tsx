import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/libs/cn/index';

/**
 * badgeVariants is a utility from class-variance-authority (cva) to generate
 * Tailwind class names for the Badge component based on the given variant.
 * This helps to keep the styling consistent and easy to extend.
 */
export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      /**
       * variant: determines the color and style of the badge.
       * - default: primary color scheme
       * - secondary: secondary color scheme
       * - destructive: for error or destructive actions
       * - outline: minimal, only text and hover effect
       */
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Badge component for displaying a small label or status.
 *
 * @param className - (optional) custom class names to override or extend the default styles
 * @param variant - (optional) badge style variant, see badgeVariants for options
 * @param asChild - (optional) if true, renders the component as a child of another component using Radix Slot
 * @param ...props - (optional) any other span element props
 *
 * If asChild is true, the component will render as a Slot (from Radix UI) to allow for flexible composition.
 * Otherwise, it renders as a standard <span>.
 */
function Badge({
  className, // custom class names
  variant, // badge style variant
  asChild = false, // render as Slot if true, otherwise as <span>
  ...props // other span props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  // Choose which component to render: Slot for composition, or span by default
  const Comp = asChild ? Slot : 'span';

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export default Badge;
