import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { PopperOwnProps } from '@mui/base/Popper';
import { SelectValue } from '@mui/base/useSelect';
import { SelectOption } from '@mui/base/useOption';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type { SelectOption } from '@mui/base/useOption';

export type SelectSlot =
  | 'root'
  | 'button'
  | 'startDecorator'
  | 'endDecorator'
  | 'indicator'
  | 'listbox';

export interface SelectSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the button.
   * @default 'button'
   */
  button?: React.ElementType;
  /**
   * The component that renders the start decorator.
   * @default 'span'
   */
  startDecorator?: React.ElementType;
  /**
   * The component that renders the end decorator.
   * @default 'span'
   */
  endDecorator?: React.ElementType;
  /**
   * The component that renders the indicator.
   * @default 'span'
   */
  indicator?: React.ElementType;
  /**
   * The component that renders the listbox.
   * @default 'ul'
   */
  listbox?: React.ElementType;
}

export interface SelectPropsVariantOverrides {}
export interface SelectPropsColorOverrides {}
export interface SelectPropsSizeOverrides {}

export type SelectSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SelectSlots,
  {
    root: SlotProps<'div', {}, SelectOwnerState<any>>;
    button: SlotProps<'button', {}, SelectOwnerState<any>>;
    startDecorator: SlotProps<'span', {}, SelectOwnerState<any>>;
    endDecorator: SlotProps<'span', {}, SelectOwnerState<any>>;
    indicator: SlotProps<'span', {}, SelectOwnerState<any>>;
    listbox: SlotProps<
      'ul',
      {
        color?: OverridableStringUnion<ColorPaletteProp, SelectPropsColorOverrides>;
        variant?: OverridableStringUnion<VariantProp, SelectPropsVariantOverrides>;
        size?: OverridableStringUnion<'sm' | 'md' | 'lg', SelectPropsSizeOverrides>;
      } & Omit<PopperOwnProps, 'slots' | 'slotProps' | 'open'>,
      SelectOwnerState<any>
    >;
  }
>;

export interface SelectStaticProps {
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<{
    focusVisible(): void;
  }>;
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color?: OverridableStringUnion<ColorPaletteProp, SelectPropsColorOverrides>;
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen?: boolean;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Trailing adornment for the select.
   */
  endDecorator?: React.ReactNode;
  /**
   * The indicator(*) for the select.
   *    ________________
   *   [ value        * ]
   *    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   */
  indicator?: React.ReactNode;
  /**
   * `id` attribute of the listbox element.
   * Also used to derive the `id` attributes of options.
   */
  listboxId?: string;
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen?: boolean;
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name?: string;
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose?: () => void;
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange?: (isOpen: boolean) => void;
  /**
   * Text to show when there is no selected value.
   */
  placeholder?: React.ReactNode;
  /**
   * If `true`, the Select cannot be empty when submitting form.
   * @default false
   */
  required?: boolean;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', SelectPropsSizeOverrides>;
  /**
   * Leading adornment for the select.
   */
  startDecorator?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant?: OverridableStringUnion<VariantProp, SelectPropsVariantOverrides>;
}

export type SelectOwnProps<OptionValue extends {}> = SelectStaticProps &
  SelectSlotsAndSlotProps & {
    /**
     * The default selected value. Use when the component is not controlled.
     */
    defaultValue?: OptionValue | null;
    /**
     * A function to convert the currently selected value to a string.
     * Used to set a value of a hidden input associated with the select,
     * so that the selected value can be posted with a form.
     */
    getSerializedValue?: (
      option: SelectValue<SelectOption<OptionValue>, false>,
    ) => React.InputHTMLAttributes<HTMLInputElement>['value'];
    /**
     * Callback fired when an option is selected.
     */
    onChange?: (
      event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
      value: OptionValue | null,
    ) => void;
    /**
     * Function that customizes the rendering of the selected value.
     */
    renderValue?: (option: SelectOption<OptionValue> | null) => React.ReactNode;
    /**
     * The selected value.
     * Set to `null` to deselect all options.
     */
    value?: OptionValue | null;
  };

export interface SelectOwnerState<OptionValue extends {}>
  extends ApplyColorInversion<SelectOwnProps<OptionValue>> {
  /**
   * If `true`, the select button is active.
   */
  active: boolean;
  /**
   * If `true`, the select button is disabled.
   */
  disabled: boolean;
  /**
   * If `true`, the select button's focus is visible.
   */
  focusVisible?: boolean;
  /**
   * If `true`, the select dropdown is open.
   */
  open: boolean;
}

export interface SelectTypeMap<
  OptionValue extends {},
  P = {},
  D extends React.ElementType = 'button',
> {
  props: P & SelectOwnProps<OptionValue>;
  defaultComponent: D;
}

export type SelectProps<
  OptionValue extends {},
  D extends React.ElementType = SelectTypeMap<OptionValue>['defaultComponent'],
> = OverrideProps<SelectTypeMap<OptionValue, {}, D>, D> & {
  component?: D;
};
