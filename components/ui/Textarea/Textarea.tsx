'use client';

import * as React from 'react';

import FormInputWraper from '@/components/shared/FormInputWraper';
import { cn } from '@/libs/cn/index';
import { DefaultInputProps } from '@/types/client/ui';
import Stack from '../Stack';

/**
 * TextareaProps extends the default textarea props and custom DefaultInputProps.
 * - label: string | undefined; // label text for the textarea
 * - labelDirection: 'vertical' | 'horizontal' | undefined; // label position
 * - name: string; // textarea name attribute
 * - required: boolean | undefined; // whether textarea is required
 * (other props inherited from React.ComponentProps<'textarea'>)
 */
type TextareaProps = React.ComponentProps<'textarea'> & DefaultInputProps;

/**
 * TextareaComponent
 * Simple wrapper for native textarea element with custom styling.
 * @param className - custom class for styling
 * @param props - other textarea props
 */
const TextareaComponent = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
};

/**
 * Textarea
 * Main textarea component with label support.
 * @param label - textarea label
 * @param labelDirection - label position (vertical/horizontal)
 * @param name - textarea name
 * @param required - is textarea required
 * @param props - other textarea props
 */
const Textarea = ({ label, labelDirection, name, required, fullWidth, ...props }: TextareaProps) => {
  const renderTextarea = () => (
    <Stack className={cn('relative', fullWidth && 'w-full')}>
      <TextareaComponent name={name} {...props} />
    </Stack>
  );

  if (label) {
    return (
      <FormInputWraper label={label} labelDirection={labelDirection} name={name} required={required}>
        {renderTextarea()}
      </FormInputWraper>
    );
  }

  return renderTextarea();
};

export default Textarea;
