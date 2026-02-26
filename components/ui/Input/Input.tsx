'use client';

import * as React from 'react';

import FormInputWraper from '@/components/shared/FormInputWraper';
import { cn } from '@/libs/cn/index';
import { DefaultInputProps } from '@/types/client/ui';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import Button from '../Button';
import Stack from '../Stack';

/**
 * InputProps extends the default input props and custom DefaultInputProps.
 * - label: string | undefined; // label text for the input
 * - labelDirection: 'vertical' | 'horizontal' | undefined; // label position
 * - name: string; // input name attribute
 * - required: boolean | undefined; // whether input is required
 * - type: string; // input type (e.g., text, password)
 * (other props inherited from React.ComponentProps<'input'>)
 */
type InputProps = React.ComponentProps<'input'> & DefaultInputProps;

/**
 * InputComponent
 * Simple wrapper for native input element with custom styling.
 * @param className - custom class for styling
 * @param type - input type (text, password, etc)
 * @param props - other input props
 */
const InputComponent = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
};

/**
 * Input
 * Main input component with label and password visibility toggle.
 * @param label - input label
 * @param labelDirection - label position (vertical/horizontal)
 * @param name - input name
 * @param required - is input required
 * @param type - input type (text, password, etc)
 * @param props - other input props
 */
const Input = ({ label, labelDirection, name, required, type, fullWidth, ...props }: InputProps) => {
  // showPassword state is used to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  /**
   * handleShowPassword
   * Toggle password visibility when eye icon is clicked.
   * Prevents default button behavior and stops event propagation.
   */
  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const renderInput = () => (
    <Stack className={cn('relative', fullWidth && 'w-full')}>
      {/* If showPassword is true, input type is 'text', otherwise use the original type */}
      <InputComponent name={name} type={showPassword ? 'text' : type} {...props} />
      {/* Show eye icon button only if input type is password */}
      {type === 'password' && (
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 dark:hover:bg-transparent hover:bg-transparent"
          onClick={handleShowPassword}
        >
          {showPassword ? <EyeIcon className="text-primary" /> : <EyeOffIcon />}
        </Button>
      )}
    </Stack>
  );

  if (label) {
    return (
      <FormInputWraper label={label} labelDirection={labelDirection} name={name} required={required}>
        {renderInput()}
      </FormInputWraper>
    );
  }

  return renderInput();
};

export default Input;
