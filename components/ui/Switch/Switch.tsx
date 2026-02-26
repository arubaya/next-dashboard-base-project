'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import FormInputWraper from '@/components/shared/FormInputWraper';
import { cn } from '@/libs/cn/index';
import { DefaultInputProps } from '@/types/client/ui';
import Stack from '../Stack';

/**
 * SwitchProps extends the default switch props and custom DefaultInputProps.
 * - label: string | undefined; // label text for the switch
 * - labelDirection: 'vertical' | 'horizontal' | undefined; // label position
 * - name: string; // switch name attribute
 * - required: boolean | undefined; // whether switch is required
 * (other props inherited from SwitchPrimitive.Root)
 */
type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & DefaultInputProps;

/**
 * SwitchComponent
 * Simple wrapper for Radix UI Switch component with custom styling.
 * @param className - custom class for styling
 * @param props - other switch props
 */
const SwitchComponent = ({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) => {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  );
};

/**
 * Switch
 * Main switch component with label support.
 * @param label - switch label
 * @param labelDirection - label position (vertical/horizontal)
 * @param name - switch name
 * @param required - is switch required
 * @param props - other switch props
 */
const Switch = ({ label, labelDirection, name, required, fullWidth, ...props }: SwitchProps) => {
  const renderSwitch = () => (
    <Stack className={cn('relative inline-flex items-center gap-2', fullWidth && 'w-full', !fullWidth && 'w-fit')}>
      <SwitchComponent name={name} {...props} />
    </Stack>
  );

  if (label) {
    return (
      <FormInputWraper label={label} labelDirection={labelDirection} name={name} required={required}>
        {renderSwitch()}
      </FormInputWraper>
    );
  }

  return renderSwitch();
};

export default Switch;
