'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import FormInputWraper from '@/components/shared/FormInputWraper';
import Button from '@/components/ui/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { cn } from '@/libs/cn/index';

export interface ComboboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface ComboboxOptionGroup {
  label: string;
  options: ComboboxOption[];
}

export interface ComboboxProps {
  /** List of options to be rendered in the combobox */
  options: ComboboxOption[] | ComboboxOptionGroup[];
  /** Currently selected value */
  value?: string | number;
  /** Callback function when value changes */
  onChange?: (value: string | number) => void;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Label for the combobox input */
  label?: string;
  /** Whether the combobox is required */
  required?: boolean;
  /** Description text below the combobox */
  description?: string;
  /** Size of the combobox trigger */
  size?: 'sm' | 'default';
  /** Whether to show error state */
  error?: boolean;
  /** Full width mode */
  fullWidth?: boolean;
  /** Custom class name */
  className?: string;
  /** Name of the combobox */
  name?: string;
}

const Combobox = ({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  disabled,
  label,
  required,
  description,
  size = 'default',
  error,
  fullWidth,
  className,
  name,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  const isGrouped = (options: ComboboxOption[] | ComboboxOptionGroup[]): options is ComboboxOptionGroup[] => {
    return options.length > 0 && 'options' in options[0];
  };

  const getSelectedLabel = () => {
    if (!value) return '';

    if (isGrouped(options)) {
      for (const group of options) {
        const option = group.options.find((opt) => String(opt.value) === String(value));
        if (option) return option.label;
      }
    } else {
      const option = options.find((opt) => String(opt.value) === String(value));
      return option?.label || '';
    }
    return '';
  };

  const handleFilter = (value: string, search: string) => {
    // Convert option value and label to lowercase for case-insensitive search
    search = search.toLowerCase();

    // Get current option from value
    const option = options
      .flatMap((opt) => (isGrouped(options) ? (opt as ComboboxOptionGroup).options : [opt as ComboboxOption]))
      .find((opt) => String(opt.value) === value);

    if (!option) return 0;

    // Search by label
    const label = option.label.toLowerCase();
    if (label.includes(search)) return 1;

    // Fallback to search by value as backup
    const optValue = String(option.value).toLowerCase();
    if (optValue.includes(search)) return 0.5;

    return 0;
  };

  const renderOptions = (options: ComboboxOption[]) => {
    return options.map((option) => (
      <CommandItem
        key={String(option.value)}
        value={String(option.value)}
        disabled={option.disabled}
        onSelect={(currentValue) => {
          onChange?.(currentValue === String(value) ? '' : option.value);
          setOpen(false);
        }}
      >
        {option.label}
        <Check className={cn('ml-auto', String(value) === String(option.value) ? 'opacity-100' : 'opacity-0')} />
      </CommandItem>
    ));
  };

  const renderCombobox = () => (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          name={name}
          className={cn(
            'justify-between',
            fullWidth && 'w-full',
            error && 'border-destructive',
            size === 'sm' ? 'h-8 text-sm' : 'h-9',
            className,
            !value && 'text-muted-foreground hover:text-muted-foreground'
          )}
        >
          {value ? getSelectedLabel() : placeholder}
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        forceMount
        align="start"
        className={cn('p-0')}
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command className="w-full" filter={handleFilter}>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList className="p-1">
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {isGrouped(options)
              ? options.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {renderOptions(group.options)}
                  </CommandGroup>
                ))
              : renderOptions(options)}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  if (label) {
    return (
      <FormInputWraper label={label} required={required} description={description}>
        {renderCombobox()}
      </FormInputWraper>
    );
  }

  return renderCombobox();
};

export default Combobox;
