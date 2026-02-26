import { cn } from '@/libs/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ElementType, HTMLAttributes, forwardRef } from 'react';

/**
 * containerVariants
 * Utility for generating Tailwind classes for container with responsive padding
 * Uses class-variance-authority (cva) for variant management.
 */
export const containerVariants = cva('@container/container mx-auto px-4 md:px-6 lg:px-8', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: 'w-full max-w-screen-2xl',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

/**
 * ContainerProps
 * Props for the Container component.
 *
 * @property {ElementType} [as] - Custom element type to render (default: 'div')
 * @property {string} [className] - Additional custom class names
 * @property {boolean} [fullWidth] - Whether container should take full width or be constrained
 * ...other HTML attributes from HTMLAttributes<HTMLElement>
 */
interface ContainerProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof containerVariants> {
  as?: ElementType;
}

/**
 * Container
 * A responsive container component with customizable width and padding.
 * Uses forwardRef to support ref forwarding.
 *
 * @param {ContainerProps} props - Props for Container component
 * @param {React.Ref<HTMLElement>} ref - Ref forwarded to the root element
 */
const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ className, as: Component = 'div', fullWidth, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({
            fullWidth,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export type { ContainerProps };
export default Container;
