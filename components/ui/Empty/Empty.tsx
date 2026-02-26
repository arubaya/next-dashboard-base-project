import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/cn/index';

/**
 * Empty component for displaying an empty state container.
 *
 * @param className - Custom class names to override or extend the default styles
 * @param props - Additional props to pass to the div element
 */
function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
        className
      )}
      {...props}
    />
  );
}

/**
 * EmptyHeader component for displaying the header section of an empty state.
 *
 * @param className - Custom class names to override or extend the default styles
 * @param props - Additional props to pass to the div element
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)}
      {...props}
    />
  );
}

/**
 * Variant styles for the EmptyMedia component.
 * - default: Transparent background
 * - icon: Muted background with specific sizing for icons
 */
const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * EmptyMedia component for displaying icons or images in an empty state.
 *
 * @param className - Custom class names to override or extend the default styles
 * @param variant - Visual style variant ('default' or 'icon')
 * @param props - Additional props to pass to the div element
 */
function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

/**
 * EmptyTitle component for displaying the title of an empty state.
 *
 * @param className - Custom class names to override or extend the default styles
 * @param props - Additional props to pass to the div element
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-title" className={cn('text-lg font-medium tracking-tight', className)} {...props} />;
}

/**
 * EmptyDescription component for displaying descriptive text in an empty state.
 * Includes styling for links within the description.
 *
 * @param className - Custom class names to override or extend the default styles
 * @param props - Additional props to pass to the div element
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}

/**
 * EmptyContent component for displaying additional content in an empty state.
 *
 * @param className - Custom class names to override or extend the default styles
 * @param props - Additional props to pass to the div element
 */
function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance', className)}
      {...props}
    />
  );
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle };
