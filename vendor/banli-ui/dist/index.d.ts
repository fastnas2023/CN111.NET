import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { DayPickerProps } from 'react-day-picker';
import { Accept } from 'react-dropzone';
import * as _radix_ui_react_slot from '@radix-ui/react-slot';
import { FieldValues, FormProvider, FieldPath, ControllerProps } from 'react-hook-form';
import * as LabelPrimitive from '@radix-ui/react-label';
import { RowData, ColumnDef } from '@tanstack/react-table';
import { ClassValue } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
declare function Button({ className, variant, size, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
}): react_jsx_runtime.JSX.Element;

declare function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;

type IconSize = 'sm' | 'md' | 'lg' | number;
type IconVariant = 'inherit' | 'primary' | 'secondary' | 'muted' | 'danger';
type IconProps = Omit<React.SVGAttributes<SVGSVGElement>, 'children'> & {
    /**
     * `<symbol id="...">` 的 id，例如 `check`、`github-icon`
     */
    name: string;
    /**
     * 可选：外部 sprite 的 URL（例如 `/icons.svg`）。
     * - 未提供时默认引用页面内的 `#${name}`（配合 <IconSprite /> 使用）
     */
    spriteUrl?: string;
    size?: IconSize;
    variant?: IconVariant;
    /**
     * 可访问性标题。提供后 Icon 会以 `role="img"` 渲染（非装饰性）。
     */
    title?: string;
};
/**
 * Icon：基于 public/icons.svg 的 SVG sprite。
 * - 默认装饰性：`aria-hidden`
 * - 提供 `title` 或 `aria-label` 后：`role="img"`
 */
declare const Icon: React.ForwardRefExoticComponent<Omit<React.SVGAttributes<SVGSVGElement>, "children"> & {
    /**
     * `<symbol id="...">` 的 id，例如 `check`、`github-icon`
     */
    name: string;
    /**
     * 可选：外部 sprite 的 URL（例如 `/icons.svg`）。
     * - 未提供时默认引用页面内的 `#${name}`（配合 <IconSprite /> 使用）
     */
    spriteUrl?: string;
    size?: IconSize;
    variant?: IconVariant;
    /**
     * 可访问性标题。提供后 Icon 会以 `role="img"` 渲染（非装饰性）。
     */
    title?: string;
} & React.RefAttributes<SVGSVGElement>>;

/**
 * IconSprite
 * - 将常用图标以 `<symbol>` 形式注入到页面中，供 `<Icon name="..."/>` 通过 `#id` 引用
 * - 作为组件库发布时，避免依赖宿主应用的 `/public/icons.svg`
 *
 * 约定：
 * - symbol id 直接使用短名（例如 `check` / `close`）
 * - stroke 使用 `currentColor`，由 `<Icon />` 或外层样式控制颜色
 */
declare function IconSprite(): react_jsx_runtime.JSX.Element;

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'muted' | 'small' | 'code';
type TypographySize = 'xs' | 'sm' | 'md' | 'lg';
type TypographyProps = React.HTMLAttributes<HTMLElement> & {
    as?: keyof React.JSX.IntrinsicElements;
    variant?: TypographyVariant;
    size?: TypographySize;
};
/**
 * Typography：文本语义与样式的最小抽象。
 * - 默认根据 `variant` 选择语义标签（可用 `as` 覆盖）
 * - `variant` 决定主样式；`size` 可用于微调字号
 */
declare const Typography: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & {
    as?: keyof React.JSX.IntrinsicElements;
    variant?: TypographyVariant;
    size?: TypographySize;
} & React.RefAttributes<HTMLElement>>;
/**
 * Text：更直观的别名（默认 body）。
 */
declare const Text: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLElement>>;
/**
 * Title：标题别名（level=1..6 对应 h1..h6）。
 */
declare const Title: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant" | "as"> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.RefAttributes<HTMLElement>>;

type SpaceDirection = 'horizontal' | 'vertical';
type SpaceSize = 'xs' | 'sm' | 'md' | 'lg' | number;
type SpaceProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
    direction?: SpaceDirection;
    size?: SpaceSize;
    align?: React.CSSProperties['alignItems'];
    wrap?: boolean;
    children?: React.ReactNode;
};
/**
 * Space：用于快速排列子元素的 gap 容器（类似 antd Space 的最小实现）。
 * - `direction` 控制横/竖排列
 * - `size` 支持预设与自定义数值（数值会写入 style.gap）
 */
declare const Space: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
    direction?: SpaceDirection;
    size?: SpaceSize;
    align?: React.CSSProperties["alignItems"];
    wrap?: boolean;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed';
type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
    orientation?: DividerOrientation;
    variant?: DividerVariant;
    /**
     * 装饰性分割线默认不参与无障碍树。
     * 若希望被读屏识别，可传 `decorative={false}` 并配合 `aria-label` 使用。
     */
    decorative?: boolean;
};
declare const Divider: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    orientation?: DividerOrientation;
    variant?: DividerVariant;
    /**
     * 装饰性分割线默认不参与无障碍树。
     * 若希望被读屏识别，可传 `decorative={false}` 并配合 `aria-label` 使用。
     */
    decorative?: boolean;
} & React.RefAttributes<HTMLDivElement>>;

type InputSize = 'sm' | 'md' | 'lg';
type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    /**
     * 视觉尺寸（与 HTML 原生 `size` 属性无关）
     */
    size?: InputSize;
    loading?: boolean;
    invalid?: boolean;
};
declare const Input: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    /**
     * 视觉尺寸（与 HTML 原生 `size` 属性无关）
     */
    size?: InputSize;
    loading?: boolean;
    invalid?: boolean;
} & React.RefAttributes<HTMLInputElement>>;

type TextareaSize = 'sm' | 'md' | 'lg';
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    size?: TextareaSize;
    loading?: boolean;
    invalid?: boolean;
};
declare const Textarea: React.ForwardRefExoticComponent<React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    size?: TextareaSize;
    loading?: boolean;
    invalid?: boolean;
} & React.RefAttributes<HTMLTextAreaElement>>;

type AvatarSize = 'sm' | 'md' | 'lg' | number;
type AvatarVariant = 'circle' | 'rounded' | 'square';
type AvatarProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    src?: string;
    alt?: string;
    /**
     * 无图片或加载失败时展示的内容。若不传，会自动从 alt 生成首字母。
     */
    fallback?: React.ReactNode;
    size?: AvatarSize;
    variant?: AvatarVariant;
};
declare const Avatar: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
    src?: string;
    alt?: string;
    /**
     * 无图片或加载失败时展示的内容。若不传，会自动从 alt 生成首字母。
     */
    fallback?: React.ReactNode;
    size?: AvatarSize;
    variant?: AvatarVariant;
} & React.RefAttributes<HTMLSpanElement>>;

type SpinnerSize = 'sm' | 'md' | 'lg' | number;
type SpinnerVariant = 'inherit' | 'primary' | 'secondary' | 'muted';
type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
    size?: SpinnerSize;
    variant?: SpinnerVariant;
    /**
     * 读屏可见的加载文案（用于可访问性）。
     */
    label?: string;
};
declare const Spinner: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & {
    size?: SpinnerSize;
    variant?: SpinnerVariant;
    /**
     * 读屏可见的加载文案（用于可访问性）。
     */
    label?: string;
} & React.RefAttributes<HTMLSpanElement>>;

declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const Drawer: React.FC<DialogPrimitive.DialogProps>;
declare const DrawerTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DrawerOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DrawerContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DrawerTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const ToastProvider: React.FC<ToastPrimitive.ToastProviderProps>;
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const Toast: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastProps & React.RefAttributes<HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastAction: React.ForwardRefExoticComponent<ToastPrimitive.ToastActionProps & React.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React.ForwardRefExoticComponent<ToastPrimitive.ToastCloseProps & React.RefAttributes<HTMLButtonElement>>;

type UIStatus = 'error' | 'warning';
type UISize = 'small' | 'middle' | 'large';
type CheckboxRootProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    invalid?: boolean;
    status?: UIStatus;
    size?: UISize;
};
declare const CheckboxRoot: React.ForwardRefExoticComponent<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "onChange"> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    invalid?: boolean;
    status?: UIStatus;
    size?: UISize;
} & React.RefAttributes<HTMLButtonElement>>;
type CheckboxIndicatorProps = React.HTMLAttributes<HTMLSpanElement>;
declare const CheckboxIndicator: React.ForwardRefExoticComponent<CheckboxIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
type CheckboxProps = Omit<CheckboxRootProps, 'checked' | 'defaultChecked' | 'onCheckedChange'> & {
    /** AntD 风格：value 即是否选中（boolean） */
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
};
/**
 * Checkbox（便捷封装）
 *
 * - 受控：value + onChange
 * - 非受控：defaultValue
 *
 * 同时保留组合式组件：CheckboxRoot / CheckboxIndicator
 */
declare function Checkbox({ value, defaultValue, onChange, children, className, ...props }: CheckboxProps): react_jsx_runtime.JSX.Element;

type RadioGroupRootProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    status?: UIStatus;
    size?: UISize;
    invalid?: boolean;
};
declare const RadioGroupRoot: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    status?: UIStatus;
    size?: UISize;
    invalid?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
type RadioGroupItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    value: string;
    disabled?: boolean;
};
declare const RadioGroupItem: React.ForwardRefExoticComponent<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
    value: string;
    disabled?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
type RadioOption = {
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
};
type RadioGroupProps = Omit<RadioGroupRootProps, 'children' | 'onValueChange'> & {
    /** AntD 风格 */
    value?: string;
    defaultValue?: string;
    onChange?: (v: string) => void;
    options: RadioOption[];
};
/**
 * RadioGroup（便捷封装）
 *
 * 组合式组件：RadioGroupRoot / RadioGroupItem
 */
declare function RadioGroup({ options, value, defaultValue, onChange, ...props }: RadioGroupProps): react_jsx_runtime.JSX.Element;

type SwitchRootProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    status?: UIStatus;
    size?: UISize;
    invalid?: boolean;
};
declare const SwitchRoot: React.ForwardRefExoticComponent<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "onChange"> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    status?: UIStatus;
    size?: UISize;
    invalid?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
type SwitchThumbProps = React.HTMLAttributes<HTMLSpanElement>;
declare const SwitchThumb: React.ForwardRefExoticComponent<SwitchThumbProps & React.RefAttributes<HTMLSpanElement>>;
type SwitchProps = Omit<SwitchRootProps, 'checked' | 'defaultChecked' | 'onCheckedChange'> & {
    /** AntD 风格：value 即是否开启（boolean） */
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
};
/**
 * Switch（便捷封装）
 *
 * 组合式组件：SwitchRoot / SwitchThumb
 */
declare function Switch({ value, defaultValue, onChange, className, ...props }: SwitchProps): react_jsx_runtime.JSX.Element;

type SelectRootProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    status?: UIStatus;
    size?: UISize;
    invalid?: boolean;
    placeholder?: React.ReactNode;
};
declare const SelectRoot: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    status?: UIStatus;
    size?: UISize;
    invalid?: boolean;
    placeholder?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
type SelectTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
declare const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type SelectValueProps = React.HTMLAttributes<HTMLSpanElement> & {
    placeholder?: React.ReactNode;
};
declare const SelectValue: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & {
    placeholder?: React.ReactNode;
} & React.RefAttributes<HTMLSpanElement>>;
type SelectContentProps = React.HTMLAttributes<HTMLDivElement>;
declare const SelectContent: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
type SelectItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    value: string;
    disabled?: boolean;
    textValue?: string;
};
declare const SelectItem: React.ForwardRefExoticComponent<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
    value: string;
    disabled?: boolean;
    textValue?: string;
} & React.RefAttributes<HTMLButtonElement>>;
type SelectOption = {
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
};
type SelectProps = Omit<SelectRootProps, 'children' | 'onValueChange'> & {
    /** AntD 风格 */
    value?: string;
    defaultValue?: string;
    onChange?: (v: string) => void;
    options: SelectOption[];
};
/**
 * Select（便捷封装）
 *
 * 组合式组件：SelectRoot / SelectTrigger / SelectContent / SelectItem / SelectValue
 */
declare function Select({ options, value, defaultValue, onChange, placeholder, ...props }: SelectProps): react_jsx_runtime.JSX.Element;

type TabsRootProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    value?: string;
    defaultValue: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    status?: UIStatus;
    size?: UISize;
    invalid?: boolean;
};
declare const TabsRoot: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
    value?: string;
    defaultValue: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    status?: UIStatus;
    size?: UISize;
    invalid?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
type TabsListProps = React.HTMLAttributes<HTMLDivElement>;
declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    disabled?: boolean;
};
declare const TabsTrigger: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    disabled?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
    value: string;
};
declare const TabsContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    value: string;
} & React.RefAttributes<HTMLDivElement>>;
type TabOption = {
    label: React.ReactNode;
    value: string;
    content: React.ReactNode;
    disabled?: boolean;
};
type TabsProps = Omit<TabsRootProps, 'children' | 'onValueChange' | 'defaultValue'> & {
    /** AntD 风格 */
    value?: string;
    defaultValue?: string;
    onChange?: (v: string) => void;
    options: TabOption[];
};
/**
 * Tabs（便捷封装）
 *
 * 组合式组件：TabsRoot / TabsList / TabsTrigger / TabsContent
 */
declare function Tabs({ options, value, defaultValue, onChange, ...props }: TabsProps): react_jsx_runtime.JSX.Element;

type DatePickerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'defaultValue' | 'onChange'> & {
    value?: Date;
    defaultValue?: Date;
    onChange?: (date: Date | undefined) => void;
    disabled?: boolean;
    placeholder?: string;
    /**
     * 用于展示的格式化（不影响 DayPicker）
     * 默认：yyyy-mm-dd（使用本地时区）
     */
    format?: (date: Date) => string;
    /**
     * 透传给 react-day-picker（已固定 mode=single，并由组件控制 selected/onSelect）
     */
    dayPickerProps?: Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'>;
};
declare function DatePicker({ value, defaultValue, onChange, disabled, placeholder, format, dayPickerProps, className, ...buttonProps }: DatePickerProps): react_jsx_runtime.JSX.Element;

type UploadProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> & {
    disabled?: boolean;
    multiple?: boolean;
    accept?: Accept;
    maxSize?: number;
    /**
     * 文件拖拽/选择后的回调（仅 acceptedFiles）
     */
    onDrop?: (files: File[]) => void;
    children?: React.ReactNode;
};
declare function Upload({ disabled, multiple, accept, maxSize, onDrop, className, children, ...props }: UploadProps): react_jsx_runtime.JSX.Element;

type PaginationProps = Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> & {
    total: number;
    pageSize?: number;
    /** 受控：当前页（从 1 开始） */
    value?: number;
    /** 非受控：默认页（从 1 开始） */
    defaultValue?: number;
    /** AntD 风格 */
    onChange?: (page: number) => void;
    siblingCount?: number;
    disabled?: boolean;
};
/**
 * Pagination
 *
 * - 受控：value + onChange
 * - 非受控：defaultValue
 */
declare function Pagination({ total, pageSize, value, defaultValue, onChange, siblingCount, disabled, className, ...props }: PaginationProps): react_jsx_runtime.JSX.Element;

type CollapseRootProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> & {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (v: string[]) => void;
    disabled?: boolean;
    /** false = Accordion（只允许展开一个） */
    multiple?: boolean;
    status?: UIStatus;
    invalid?: boolean;
};
declare const CollapseRoot: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (v: string[]) => void;
    disabled?: boolean;
    /** false = Accordion（只允许展开一个） */
    multiple?: boolean;
    status?: UIStatus;
    invalid?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
type CollapseItemProps = React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    disabled?: boolean;
};
declare const CollapseItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    disabled?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
type CollapseTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
declare const CollapseTrigger: React.ForwardRefExoticComponent<CollapseTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type CollapseContentProps = React.HTMLAttributes<HTMLDivElement>;
declare const CollapseContent: React.ForwardRefExoticComponent<CollapseContentProps & React.RefAttributes<HTMLDivElement>>;
type CollapseItemOption = {
    key: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
};
type CollapseProps = Omit<CollapseRootProps, 'children' | 'onValueChange' | 'defaultValue'> & {
    /** AntD 风格 */
    value?: string[];
    defaultValue?: string[];
    onChange?: (v: string[]) => void;
    items: CollapseItemOption[];
};
/**
 * Collapse（便捷封装）
 *
 * 组合式组件：CollapseRoot / CollapseItem / CollapseTrigger / CollapseContent
 */
declare function Collapse({ items, value, defaultValue, onChange, ...props }: CollapseProps): react_jsx_runtime.JSX.Element;

type BreadcrumbItem = {
    label: React.ReactNode;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
};
type BreadcrumbProps = React.HTMLAttributes<HTMLElement> & {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    disabled?: boolean;
};
declare const Breadcrumb: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    disabled?: boolean;
} & React.RefAttributes<HTMLElement>>;

type EmptyProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * 图标（通常为装饰性）。建议传入 `aria-hidden` 的 icon。
     */
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    /**
     * 与现有 UI 组件保持一致：small / middle / large
     */
    size?: UISize;
    /**
     * 可选：是否启用 a11y `role="status"`（不默认开启，避免对页面读屏造成干扰）。
     * - 若你显式传入 `role`，则以 `role` 为准。
     */
    useStatusRole?: boolean;
};
/**
 * Empty：空状态通用组件（icon / title / description / actions）。
 */
declare const Empty: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    /**
     * 图标（通常为装饰性）。建议传入 `aria-hidden` 的 icon。
     */
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    /**
     * 与现有 UI 组件保持一致：small / middle / large
     */
    size?: UISize;
    /**
     * 可选：是否启用 a11y `role="status"`（不默认开启，避免对页面读屏造成干扰）。
     * - 若你显式传入 `role`，则以 `role` 为准。
     */
    useStatusRole?: boolean;
} & React.RefAttributes<HTMLDivElement>>;

type ResultStatus = 'info' | 'success' | 'warning' | 'error';
type ResultProps = React.HTMLAttributes<HTMLDivElement> & {
    status?: ResultStatus;
    /**
     * 图标（可选）。未提供时会根据 status 渲染默认图标。
     */
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
};
/**
 * Result：结果反馈组件（status / icon / title / description / actions）。
 * - 默认 `role="alert"`（可通过 props 覆盖）
 */
declare const Result: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    status?: ResultStatus;
    /**
     * 图标（可选）。未提供时会根据 status 渲染默认图标。
     */
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;

type SkeletonVariant = 'text' | 'block' | 'avatar';
type SkeletonSize = 'small' | 'middle' | 'large';
type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: SkeletonVariant;
    size?: SkeletonSize;
};
declare const Skeleton: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    variant?: SkeletonVariant;
    size?: SkeletonSize;
} & React.RefAttributes<HTMLDivElement>>;

type ConfirmDialogProps = {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** 可选：提供触发器时自动包裹 DialogTrigger(asChild) */
    trigger?: React.ReactNode;
    /** a11y：DialogContent 内必须包含 title/description */
    title: React.ReactNode;
    description: React.ReactNode;
    /** 额外内容（位于 description 下方） */
    children?: React.ReactNode;
    confirmText?: React.ReactNode;
    cancelText?: React.ReactNode;
    danger?: boolean;
    /** 支持 async；resolve 后自动关闭，reject 则保持打开并结束 loading */
    onConfirm?: () => void | Promise<unknown>;
    onCancel?: () => void;
    /** 传递给 DialogContent 的 className（用于自定义宽度/间距等） */
    contentClassName?: string;
};
declare function ConfirmDialog({ open, defaultOpen, onOpenChange, trigger, title, description, children, confirmText, cancelText, danger, onConfirm, onCancel, contentClassName, }: ConfirmDialogProps): react_jsx_runtime.JSX.Element;

type FormLayoutVariant = 'horizontal' | 'vertical' | 'inline';
type FormLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
    layout?: FormLayoutVariant;
    /**
     * horizontal / inline 模式下 label 列宽（px 或任意 CSS 长度字符串，如 "10rem"）。
     *
     * 默认：120px
     */
    labelWidth?: number | string;
};
/**
 * FormLayout（表单布局容器）
 *
 * - 提供 layout（horizontal/vertical/inline）
 * - 提供 labelWidth（以 CSS 变量形式下发给 FormCol）
 *
 * 说明：
 * - 本组件不依赖 react-hook-form；可与现有 FormField/FormItem/FormLabel/FormControl/FormMessage 混用。
 * - 当你想将 RHF 的 <FormItem> 转为“横向 label + 控件”布局时，推荐将 <FormItem> 放在 <FormCol asItem> 内，
 *   FormCol 会自动为该子节点追加 `contents`，从而让 label/控件/错误信息参与 FormCol 的 grid 布局。
 */
declare const FormLayout: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    layout?: FormLayoutVariant;
    /**
     * horizontal / inline 模式下 label 列宽（px 或任意 CSS 长度字符串，如 "10rem"）。
     *
     * 默认：120px
     */
    labelWidth?: number | string;
} & React.RefAttributes<HTMLDivElement>>;
type FormSectionProps = React.HTMLAttributes<HTMLElement>;
/**
 * FormSection（表单分区容器）
 *
 * 仅提供结构化分组与统一 spacing；内容完全由 children 决定。
 */
declare const FormSection: React.ForwardRefExoticComponent<FormSectionProps & React.RefAttributes<HTMLElement>>;
type FormRowProps = React.HTMLAttributes<HTMLDivElement>;
/**
 * FormRow（表单行）
 *
 * - vertical / horizontal：默认 grid gap
 * - inline：默认 flex wrap，更适合查询条件类表单
 */
declare const FormRow: React.ForwardRefExoticComponent<FormRowProps & React.RefAttributes<HTMLDivElement>>;
type FormColProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * 便捷适配 RHF 的 FormItem：
     * - 当 children 是单个 ReactElement 时，FormCol 会 clone 并为其追加 `contents` class。
     * - 这样 FormItem 本身不会产生额外布局容器，其内部 label/控件/错误信息可以直接参与 FormCol 的 grid。
     */
    asItem?: boolean;
    /**
     * 非 RHF 场景：直接由 FormCol 渲染 label 区域。
     * RHF 场景推荐使用 <FormLabel> 放在 <FormItem> 内，配合 asItem。
     */
    label?: React.ReactNode;
    htmlFor?: string;
    labelClassName?: string;
    contentClassName?: string;
    /** 覆盖 FormLayout 的 labelWidth（px 或 CSS 长度）。 */
    labelWidth?: number | string;
};
declare const FormCol: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    /**
     * 便捷适配 RHF 的 FormItem：
     * - 当 children 是单个 ReactElement 时，FormCol 会 clone 并为其追加 `contents` class。
     * - 这样 FormItem 本身不会产生额外布局容器，其内部 label/控件/错误信息可以直接参与 FormCol 的 grid。
     */
    asItem?: boolean;
    /**
     * 非 RHF 场景：直接由 FormCol 渲染 label 区域。
     * RHF 场景推荐使用 <FormLabel> 放在 <FormItem> 内，配合 asItem。
     */
    label?: React.ReactNode;
    htmlFor?: string;
    labelClassName?: string;
    contentClassName?: string;
    /** 覆盖 FormLayout 的 labelWidth（px 或 CSS 长度）。 */
    labelWidth?: number | string;
} & React.RefAttributes<HTMLDivElement>>;

/**
 * Form（react-hook-form 组件族）
 *
 * 目标：
 * - Label 与控件关联（id/htmlFor）
 * - invalid 时 aria-describedby 指向错误信息
 * - 支持 className
 */
type FormProps<TFieldValues extends FieldValues = FieldValues> = React.ComponentProps<typeof FormProvider<TFieldValues>>;
declare function Form<TFieldValues extends FieldValues = FieldValues>(props: FormProps<TFieldValues>): react_jsx_runtime.JSX.Element;
declare function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: ControllerProps<TFieldValues, TName>): react_jsx_runtime.JSX.Element;
declare const FormItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FormLabel: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;
declare const FormControl: React.ForwardRefExoticComponent<Omit<_radix_ui_react_slot.SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const FormMessage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;

type TableProps<TData extends RowData> = {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
    /**
     * 加载态：显示 loading 行，并隐藏空状态。
     */
    loading?: boolean;
    /**
     * 空数据时显示的文案/节点。
     */
    emptyText?: React.ReactNode;
    className?: string;
};
declare function Table<TData extends RowData>({ data, columns, loading, emptyText, className, }: TableProps<TData>): react_jsx_runtime.JSX.Element;

type TreeNode = {
    key: string;
    title: React.ReactNode;
    children?: TreeNode[];
    /**
     * 显式标记为叶子节点（即使 loadData 存在，也不会尝试异步加载）。
     */
    isLeaf?: boolean;
    disabled?: boolean;
};
type TreeFilterOption = (searchValue: string, node: TreeNode) => boolean;
type TreeLoadData = (node: TreeNode) => Promise<TreeNode[] | void>;
type TreeProps = {
    data: TreeNode[];
    className?: string;
    /**
     * 是否渲染搜索框（否则仅支持通过传入 searchValue/defaultSearchValue 来过滤）。
     */
    showSearch?: boolean;
    searchValue?: string;
    defaultSearchValue?: string;
    onSearchValueChange?: (next: string) => void;
    filterOption?: TreeFilterOption;
    /**
     * 异步加载子节点：在展开且节点未加载时调用。
     * - 若 resolve 返回 TreeNode[]，会被写入到该节点的 children 中并触发渲染
     * - 若 resolve 返回 void，视为“已加载但无子节点”，不会重复调用
     */
    loadData?: TreeLoadData;
    /**
     * 受控/非受控：加载中的 key 列表（用于展示 loading 指示）。
     */
    loadingKeys?: string[];
    defaultLoadingKeys?: string[];
    onLoadingKeysChange?: (next: string[]) => void;
    /**
     * 展开状态（用于键盘左右键与异步加载）。
     */
    expandedKeys?: string[];
    defaultExpandedKeys?: string[];
    onExpandedKeysChange?: (next: string[]) => void;
    /**
     * 单选选中（用于 aria-selected）。
     */
    selectedKey?: string;
    defaultSelectedKey?: string;
    onSelectedKeyChange?: (next?: string) => void;
};
declare function Tree({ data, className, showSearch, searchValue, defaultSearchValue, onSearchValueChange, filterOption, loadData, loadingKeys, defaultLoadingKeys, onLoadingKeysChange, expandedKeys, defaultExpandedKeys, onExpandedKeysChange, selectedKey, defaultSelectedKey, onSelectedKeyChange, }: TreeProps): react_jsx_runtime.JSX.Element;

type CascaderOption = {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
    /** 显式标记为叶子节点（没有下一列） */
    isLeaf?: boolean;
    /** 子节点（若为空且 isLeaf !== true，可通过 loadData 异步加载） */
    children?: CascaderOption[];
    /** 异步加载时用于展示 loading */
    loading?: boolean;
};
type CascaderFilterOption = (inputValue: string, path: CascaderOption[]) => boolean;
type CascaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    options: CascaderOption[];
    value?: string[];
    defaultValue?: string[];
    onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
    placeholder?: React.ReactNode;
    disabled?: boolean;
    /** 显示搜索输入框（仅支持基础字符串过滤） */
    showSearch?: boolean;
    searchValue?: string;
    defaultSearchValue?: string;
    onSearchValueChange?: (v: string) => void;
    filterOption?: CascaderFilterOption;
    /** 异步加载下一列：通常在 selectedOptions 最末级上补齐 children */
    loadData?: (selectedOptions: CascaderOption[]) => void | Promise<void>;
};
declare function Cascader({ options, value, defaultValue, onChange, placeholder, disabled, showSearch, searchValue, defaultSearchValue, onSearchValueChange, filterOption, loadData, className, ...props }: CascaderProps): react_jsx_runtime.JSX.Element;

declare function cn(...v: ClassValue[]): string;

type VariantsMap = Record<string, Record<string, string>>;
type VariantSelection<V extends VariantsMap> = {
    [K in keyof V]?: keyof V[K];
} & {
    className?: string;
};
/**
 * 轻量 variant 工具（替代 cva 的最小实现）
 * - 统一组件的 `variant` / `size` 等 props 到 className
 * - 默认值通过 `defaultVariants` 提供
 */
declare function createVariants<V extends VariantsMap>(base: string, variants: V, defaultVariants?: Partial<{
    [K in keyof V]: keyof V[K];
}>): (props?: VariantSelection<V>) => string;

export { Avatar, type AvatarProps, type AvatarSize, type AvatarVariant, Badge, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, Button, type ButtonSize, type ButtonVariant, Cascader, type CascaderFilterOption, type CascaderOption, type CascaderProps, Checkbox, CheckboxIndicator, type CheckboxIndicatorProps, type CheckboxProps, CheckboxRoot, type CheckboxRootProps, Collapse, CollapseContent, type CollapseContentProps, CollapseItem, type CollapseItemOption, type CollapseItemProps, type CollapseProps, CollapseRoot, type CollapseRootProps, CollapseTrigger, type CollapseTriggerProps, ConfirmDialog, type ConfirmDialogProps, DatePicker, type DatePickerProps, Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Divider, type DividerOrientation, type DividerProps, type DividerVariant, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuTrigger, Empty, type EmptyProps, Form, FormCol, type FormColProps, FormControl, FormField, FormItem, FormLabel, FormLayout, type FormLayoutProps, type FormLayoutVariant, FormMessage, type FormProps, FormRow, type FormRowProps, FormSection, type FormSectionProps, Icon, type IconProps, type IconSize, IconSprite, type IconVariant, Input, type InputProps, type InputSize, Pagination, type PaginationProps, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps, RadioGroupRoot, type RadioGroupRootProps, type RadioOption, Result, type ResultProps, type ResultStatus, Select, SelectContent, type SelectContentProps, SelectItem, type SelectItemProps, type SelectOption, type SelectProps, SelectRoot, type SelectRootProps, SelectTrigger, type SelectTriggerProps, SelectValue, type SelectValueProps, Skeleton, type SkeletonProps, type SkeletonSize, type SkeletonVariant, Space, type SpaceDirection, type SpaceProps, type SpaceSize, Spinner, type SpinnerProps, type SpinnerSize, type SpinnerVariant, Switch, type SwitchProps, SwitchRoot, type SwitchRootProps, SwitchThumb, type SwitchThumbProps, type TabOption, Table, type TableProps, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsProps, TabsRoot, type TabsRootProps, TabsTrigger, type TabsTriggerProps, Text, Textarea, type TextareaProps, type TextareaSize, Title, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Tree, type TreeFilterOption, type TreeLoadData, type TreeNode, type TreeProps, Typography, type TypographyProps, type TypographySize, type TypographyVariant, type UISize, type UIStatus, Upload, type UploadProps, type VariantSelection, cn, createVariants };
