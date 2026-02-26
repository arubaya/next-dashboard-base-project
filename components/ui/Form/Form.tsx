'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import Label from '@/components/ui/Label';
import { cn } from '@/libs/cn/index';
import Box from '../Box';

/**
 * Context value for FormField, used to provide field name to child components.
 * @template TFieldValues - The type of form values.
 * @template TName - The type of the field name.
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName; // The name of the field in the form.
};

/**
 * React context to share field name between FormField and its children.
 */
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

/**
 * FormField component wraps react-hook-form's Controller and provides field context.
 * Should be used to wrap each form field to enable context-based helpers.
 */
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/**
 * Custom hook to access field context and state.
 * Throws error if used outside of FormField.
 * Returns useful ids and error state for accessibility and error handling.
 */
export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  // Get the current form state for the specific field
  const formState = useFormState({ name: fieldContext.name });
  // Get the field state (error, touched, etc) for the field
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id, // unique id for the form item
    name: fieldContext.name, // field name
    formItemId: `${id}-form-item`, // id for the form item container
    formDescriptionId: `${id}-form-item-description`, // id for the description element
    formMessageId: `${id}-form-item-message`, // id for the error/message element
    ...fieldState, // includes error, isTouched, isDirty, etc
  };
};

/**
 * Context value for FormItem, used to provide unique id to child components.
 */
type FormItemContextValue = {
  id: string; // unique id for the form item, used for accessibility
};

/**
 * React context to share item id between FormItem and its children.
 */
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

/**
 * FormItem component provides a unique id context for each form item.
 * Should wrap each field group for accessibility and proper id referencing.
 */
export function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId(); // generate unique id for this item

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}

/**
 * FormLabel component renders a label for the form field.
 * It uses context to set htmlFor and error state for accessibility and styling.
 */
export function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

/**
 * FormControl component renders the input control slot.
 * Sets proper aria attributes for accessibility and error handling.
 */
export function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        // If error exists, describe both description and message, else just description
        !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

/**
 * FormDescription component renders a description for the form field.
 * Uses context to set the correct id for accessibility.
 */
export function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

/**
 * FormMessage component renders the error message or custom message for the field.
 * If there is no error and no children, returns null.
 */
export function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  // If error exists, show error message, else show children
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p data-slot="form-message" id={formMessageId} className={cn('text-destructive text-sm', className)} {...props}>
      {body}
    </p>
  );
}

/**
 * Props for the Form component.
 * @template TFieldValues - The type of form values.
 * @property className - Optional className for the form container.
 * @property onSubmit - Function to handle form submission.
 * @property onError - Optional function to handle form errors.
 */
type FormProps<TFieldValues extends FieldValues = FieldValues> = React.ComponentProps<
  typeof FormProvider<TFieldValues>
> & {
  className?: string; // Optional className for the form
  onSubmit?: SubmitHandler<TFieldValues>; // Required submit handler
  onError?: SubmitErrorHandler<TFieldValues>; // Optional error handler
};

/**
 * Form component wraps FormProvider and renders a form element.
 * Handles form submission and error handling using react-hook-form.
 */
const Form = <TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit,
  className,
  onError,
  ...props
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...props}>
      {/* Box is used as the form element, and handleSubmit is attached if onSubmit is provided */}
      <Box as="form" className={className} {...(onSubmit && { onSubmit: props.handleSubmit(onSubmit, onError) })}>
        {children}
      </Box>
    </FormProvider>
  );
};

export default Form;
