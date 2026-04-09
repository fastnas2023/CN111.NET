// src/lib/cn.ts
import clsx from "clsx";
function cn(...v) {
  return clsx(v);
}

// src/components/primitives/Button.tsx
import { jsx } from "react/jsx-runtime";
function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}) {
  const base = "inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-banli-secondary/60 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    primary: "bg-aivent-primary text-white hover:brightness-110 shadow-glow",
    secondary: "bg-aivent-secondary text-slate-950 hover:brightness-110",
    ghost: "border border-aivent-border bg-white/0 text-white hover:bg-white/10"
  };
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base"
  };
  return /* @__PURE__ */ jsx("button", { className: cn(base, variants[variant], sizes[size], className), ...props });
}

// src/components/primitives/Badge.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Badge({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full border border-aivent-border bg-white/5 px-3 py-1 text-xs font-semibold text-aivent-muted",
        className
      ),
      ...props
    }
  );
}

// src/components/primitives/Icon.tsx
import * as React from "react";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var sizeMap = { sm: 16, md: 20, lg: 24 };
var variantClass = {
  inherit: "",
  primary: "text-banli-primary",
  secondary: "text-banli-secondary",
  muted: "text-banli-muted",
  danger: "text-red-400"
};
var Icon = React.forwardRef(function Icon2({ className, name, spriteUrl, size = "md", variant = "inherit", title, ...props }, ref) {
  const px = typeof size === "number" ? size : sizeMap[size];
  const href = spriteUrl ? `${spriteUrl}#${name}` : `#${name}`;
  const hasLabel = Boolean(title) || Boolean(props["aria-label"]);
  const decorative = !hasLabel;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref,
      width: px,
      height: px,
      focusable: "false",
      "aria-hidden": decorative ? true : void 0,
      role: decorative ? void 0 : "img",
      className: cn("inline-block shrink-0 align-middle", variantClass[variant], className),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx3("title", { children: title }) : null,
        /* @__PURE__ */ jsx3("use", { href, xlinkHref: href })
      ]
    }
  );
});

// src/components/primitives/IconSprite.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function IconSprite() {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      "aria-hidden": "true",
      focusable: "false",
      width: "0",
      height: "0",
      style: { position: "absolute", width: 0, height: 0, overflow: "hidden" },
      children: [
        /* @__PURE__ */ jsx4("symbol", { id: "check", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx4(
          "path",
          {
            d: "M20 6 9 17l-5-5",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx4("symbol", { id: "close", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx4(
          "path",
          {
            d: "M18 6 6 18M6 6l12 12",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx4("symbol", { id: "chevron-down", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx4(
          "path",
          {
            d: "m6 9 6 6 6-6",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx4("symbol", { id: "chevron-right", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx4(
          "path",
          {
            d: "m9 6 6 6-6 6",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx4("symbol", { id: "search", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx4(
          "path",
          {
            d: "M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx4("symbol", { id: "loader", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx4(
          "path",
          {
            d: "M21 12a9 9 0 1 1-6.22-8.55",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) })
      ]
    }
  );
}

// src/components/primitives/Typography.tsx
import * as React2 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var defaultAs = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  muted: "p",
  small: "span",
  code: "code"
};
var variantClass2 = {
  h1: "text-4xl font-bold tracking-tight text-white md:text-6xl",
  h2: "text-3xl font-bold tracking-tight text-white md:text-4xl",
  h3: "text-2xl font-bold tracking-tight text-white md:text-3xl",
  h4: "text-xl font-semibold text-white",
  h5: "text-lg font-semibold text-white",
  h6: "text-base font-semibold text-white",
  body: "text-sm leading-relaxed text-white md:text-base",
  muted: "text-sm leading-relaxed text-banli-muted md:text-base",
  small: "text-xs text-banli-muted",
  code: "rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white"
};
var sizeClass = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg"
};
var Typography = React2.forwardRef(function Typography2({ as, className, variant = "body", size, ...props }, ref) {
  const Tag = as ?? defaultAs[variant];
  return React2.createElement(Tag, {
    ...props,
    ref,
    className: cn(variantClass2[variant], size ? sizeClass[size] : void 0, className)
  });
});
var Text = React2.forwardRef(function Text2(props, ref) {
  return /* @__PURE__ */ jsx5(Typography, { ref, variant: "body", ...props });
});
var Title = React2.forwardRef(function Title2({ level = 2, ...props }, ref) {
  const variantMap = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6"
  };
  const variant = variantMap[level];
  return /* @__PURE__ */ jsx5(Typography, { ref, variant, ...props });
});
Text.displayName = "Text";
Title.displayName = "Title";

// src/components/primitives/Space.tsx
import * as React3 from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var gapClass = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6"
};
var Space = React3.forwardRef(function Space2({ className, direction = "horizontal", size = "md", align, wrap = false, style, ...props }, ref) {
  const isNumber = typeof size === "number";
  const mergedStyle = {
    ...style,
    ...align ? { alignItems: align } : null,
    ...isNumber ? { gap: size } : null
  };
  return /* @__PURE__ */ jsx6(
    "div",
    {
      ref,
      className: cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        wrap ? "flex-wrap" : void 0,
        isNumber ? void 0 : gapClass[size],
        className
      ),
      style: mergedStyle,
      ...props
    }
  );
});

// src/components/primitives/Divider.tsx
import * as React4 from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var Divider = React4.forwardRef(function Divider2({ className, orientation = "horizontal", variant = "solid", decorative = true, ...props }, ref) {
  const borderStyle = variant === "dashed" ? "border-dashed" : "border-solid";
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx7(
      "div",
      {
        ref,
        role: "separator",
        "aria-orientation": "vertical",
        "aria-hidden": decorative ? true : void 0,
        className: cn("h-full w-px shrink-0 border-l border-aivent-border", borderStyle, className),
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsx7(
    "div",
    {
      ref,
      role: "separator",
      "aria-orientation": "horizontal",
      "aria-hidden": decorative ? true : void 0,
      className: cn("w-full border-t border-aivent-border", borderStyle, className),
      ...props
    }
  );
});

// src/components/primitives/Input.tsx
import * as React5 from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var Input = React5.forwardRef(
  ({ className, size = "md", disabled, loading, invalid, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const isDisabled = Boolean(disabled || loading);
    const isInvalid = Boolean(invalid || ariaInvalid);
    const base = "w-full rounded-lg border bg-black/20 text-white outline-none transition placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-banli-secondary/60 disabled:pointer-events-none disabled:opacity-50";
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-3 text-sm",
      lg: "h-12 px-4 text-base"
    };
    return /* @__PURE__ */ jsx8(
      "input",
      {
        ref,
        disabled: isDisabled,
        "aria-busy": loading || void 0,
        "aria-invalid": isInvalid || void 0,
        "data-loading": loading ? "" : void 0,
        "data-invalid": isInvalid ? "" : void 0,
        className: cn(
          base,
          sizes[size],
          isInvalid ? "border-red-500/70 focus:border-red-500" : "border-aivent-border focus:border-banli-secondary/70",
          loading ? "cursor-wait" : "",
          className
        ),
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/components/primitives/Textarea.tsx
import * as React6 from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var Textarea = React6.forwardRef(
  ({ className, size = "md", disabled, loading, invalid, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const isDisabled = Boolean(disabled || loading);
    const isInvalid = Boolean(invalid || ariaInvalid);
    const base = "w-full rounded-lg border bg-black/20 text-white outline-none transition placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-banli-secondary/60 disabled:pointer-events-none disabled:opacity-50";
    const sizes = {
      sm: "min-h-[96px] px-3 py-2 text-sm",
      md: "min-h-[140px] px-3 py-3 text-sm",
      lg: "min-h-[180px] px-4 py-3 text-base"
    };
    return /* @__PURE__ */ jsx9(
      "textarea",
      {
        ref,
        disabled: isDisabled,
        "aria-busy": loading || void 0,
        "aria-invalid": isInvalid || void 0,
        "data-loading": loading ? "" : void 0,
        "data-invalid": isInvalid ? "" : void 0,
        className: cn(
          base,
          sizes[size],
          isInvalid ? "border-red-500/70 focus:border-red-500" : "border-aivent-border focus:border-banli-secondary/70",
          loading ? "cursor-wait" : "",
          className
        ),
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";

// src/components/primitives/Avatar.tsx
import * as React7 from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var sizeMap2 = { sm: 28, md: 40, lg: 56 };
var radiusClass = {
  circle: "rounded-full",
  rounded: "rounded-xl",
  square: "rounded-none"
};
function initialsFromAlt(alt) {
  if (!alt) return "";
  const parts = alt.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase());
  return letters.join("");
}
var Avatar = React7.forwardRef(function Avatar2({ className, src, alt, fallback, size = "md", variant = "circle", style, ...props }, ref) {
  const [errored, setErrored] = React7.useState(false);
  const px = typeof size === "number" ? size : sizeMap2[size];
  const showImg = Boolean(src) && !errored;
  const initials = typeof fallback === "undefined" ? initialsFromAlt(alt) : "";
  return /* @__PURE__ */ jsx10(
    "span",
    {
      ref,
      className: cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden border border-aivent-border bg-white/10 text-xs font-semibold text-white",
        radiusClass[variant],
        className
      ),
      style: { width: px, height: px, ...style },
      ...props,
      children: showImg ? /* @__PURE__ */ jsx10(
        "img",
        {
          src,
          alt: alt ?? "",
          "aria-hidden": alt ? void 0 : true,
          className: "h-full w-full object-cover",
          onError: () => setErrored(true)
        }
      ) : /* @__PURE__ */ jsx10("span", { role: "img", "aria-label": alt || "Avatar", className: "select-none", children: fallback ?? (initials || "\u2022") })
    }
  );
});

// src/components/primitives/Spinner.tsx
import * as React8 from "react";
import { jsx as jsx11, jsxs as jsxs3 } from "react/jsx-runtime";
var sizeClass2 = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6"
};
var variantClass3 = {
  inherit: "",
  primary: "text-aivent-primary",
  secondary: "text-aivent-secondary",
  muted: "text-aivent-muted"
};
var Spinner = React8.forwardRef(function Spinner2({ className, size = "md", variant = "inherit", label = "Loading", ...props }, ref) {
  const isNumber = typeof size === "number";
  return /* @__PURE__ */ jsxs3(
    "span",
    {
      ref,
      role: "status",
      "aria-label": label,
      className: cn("inline-flex items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs3(
          "svg",
          {
            className: cn("animate-spin", variantClass3[variant], isNumber ? void 0 : sizeClass2[size]),
            style: isNumber ? { width: size, height: size } : void 0,
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx11(
                "circle",
                {
                  className: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  strokeWidth: "4",
                  fill: "none"
                }
              ),
              /* @__PURE__ */ jsx11(
                "path",
                {
                  className: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx11("span", { className: "sr-only", children: label })
      ]
    }
  );
});

// src/components/ui/tooltip.tsx
import * as React10 from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// src/motion/provider.tsx
import * as React9 from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var MotionContext = React9.createContext({
  mode: "auto",
  enabled: true,
  reduced: false
});
function useAiventMotion() {
  return React9.useContext(MotionContext);
}

// src/components/ui/tooltip.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React10.forwardRef(({ className, sideOffset = 8, ...props }, ref) => (
  // Tooltip Content 必须是组件（为了读取 motion context），因此这里做一次包装
  /* @__PURE__ */ jsx13(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx13(TooltipContentInner, { ref, sideOffset, className, ...props }) })
));
TooltipContent.displayName = "TooltipContent";
var TooltipContentInner = React10.forwardRef(({ className, sideOffset = 8, ...props }, ref) => {
  const motion = useAiventMotion();
  return /* @__PURE__ */ jsx13(
    TooltipPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn(
        "z-50 overflow-hidden rounded-lg border border-aivent-border bg-aivent-panel px-3 py-2 text-xs font-semibold text-white shadow-glow",
        motion.enabled ? "animate-in fade-in-0 zoom-in-95" : "",
        className
      ),
      ...props
    }
  );
});
TooltipContentInner.displayName = "TooltipContentInner";

// src/components/ui/popover.tsx
import * as React11 from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsx as jsx14 } from "react/jsx-runtime";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = React11.forwardRef(({ className, align = "center", sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx14(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx14(PopoverContentInner, { ref, align, sideOffset, className, ...props }) }));
PopoverContent.displayName = "PopoverContent";
var PopoverContentInner = React11.forwardRef(({ className, align = "center", sideOffset = 8, ...props }, ref) => {
  const motion = useAiventMotion();
  return /* @__PURE__ */ jsx14(
    PopoverPrimitive.Content,
    {
      ref,
      align,
      sideOffset,
      className: cn(
        "z-50 w-72 rounded-xl2 border border-aivent-border bg-aivent-panel p-4 text-sm text-aivent-text shadow-glow outline-none",
        motion.enabled ? "animate-in fade-in-0 zoom-in-95" : "",
        className
      ),
      ...props
    }
  );
});
PopoverContentInner.displayName = "PopoverContentInner";

// src/components/ui/dropdown-menu.tsx
import * as React12 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { jsx as jsx15 } from "react/jsx-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuContent = React12.forwardRef(({ className, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx15(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx15(DropdownMenuContentInner, { ref, sideOffset, className, ...props }) }));
DropdownMenuContent.displayName = "DropdownMenuContent";
var DropdownMenuContentInner = React12.forwardRef(({ className, sideOffset = 8, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }, ref) => {
  const motion = useAiventMotion();
  return /* @__PURE__ */ jsx15(
    DropdownMenuPrimitive.Content,
    {
      ref,
      sideOffset,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabel ? void 0 : ariaLabelledBy,
      className: cn(
        "z-50 min-w-44 overflow-hidden rounded-xl2 border border-aivent-border bg-aivent-panel p-1 text-sm text-aivent-text shadow-glow",
        motion.enabled ? "animate-in fade-in-0 zoom-in-95" : "",
        className
      ),
      ...props
    }
  );
});
DropdownMenuContentInner.displayName = "DropdownMenuContentInner";
var DropdownMenuItem = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx15(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition",
      "focus:bg-white/10 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuSeparator = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx15(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("my-1 h-px bg-aivent-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// src/components/ui/dialog.tsx
import * as React13 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { jsx as jsx16, jsxs as jsxs4 } from "react/jsx-runtime";
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogClose = DialogPrimitive.Close;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className),
    ...props
  }
));
DialogOverlay.displayName = "DialogOverlay";
var DialogContent = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs4(DialogPortal, { children: [
  /* @__PURE__ */ jsx16(DialogOverlay, {}),
  /* @__PURE__ */ jsx16(DialogContentInner, { ref, className, ...props })
] }));
DialogContent.displayName = "DialogContent";
var DialogContentInner = React13.forwardRef(({ className, ...props }, ref) => {
  const motion = useAiventMotion();
  return /* @__PURE__ */ jsx16(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-1/2 top-1/2 z-50 w-[min(520px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl2 border border-aivent-border bg-aivent-panel p-6 text-aivent-text shadow-glow outline-none",
        motion.enabled ? "animate-in fade-in-0 zoom-in-95" : "",
        className
      ),
      ...props
    }
  );
});
DialogContentInner.displayName = "DialogContentInner";
var DialogTitle = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(DialogPrimitive.Title, { ref, className: cn("text-lg font-bold text-white", className), ...props }));
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(DialogPrimitive.Description, { ref, className: cn("mt-2 text-sm text-aivent-muted", className), ...props }));
DialogDescription.displayName = "DialogDescription";

// src/components/ui/drawer.tsx
import * as React14 from "react";
import * as DialogPrimitive2 from "@radix-ui/react-dialog";
import { jsx as jsx17, jsxs as jsxs5 } from "react/jsx-runtime";
var Drawer = DialogPrimitive2.Root;
var DrawerTrigger = DialogPrimitive2.Trigger;
var DrawerClose = DialogPrimitive2.Close;
var DrawerPortal = DialogPrimitive2.Portal;
var DrawerOverlay = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx17(
  DialogPrimitive2.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className),
    ...props
  }
));
DrawerOverlay.displayName = "DrawerOverlay";
var DrawerContent = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs5(DrawerPortal, { children: [
  /* @__PURE__ */ jsx17(DrawerOverlay, {}),
  /* @__PURE__ */ jsx17(DrawerContentInner, { ref, className, ...props })
] }));
DrawerContent.displayName = "DrawerContent";
var DrawerContentInner = React14.forwardRef(({ className, ...props }, ref) => {
  const motion = useAiventMotion();
  return /* @__PURE__ */ jsx17(
    DialogPrimitive2.Content,
    {
      ref,
      className: cn(
        "fixed right-0 top-0 z-50 h-full w-[min(420px,calc(100%-2rem))] border-l border-aivent-border bg-aivent-panel p-6 text-aivent-text shadow-glow outline-none",
        motion.enabled ? "animate-in fade-in-0 slide-in-from-right-4" : "",
        className
      ),
      ...props
    }
  );
});
DrawerContentInner.displayName = "DrawerContentInner";
var DrawerTitle = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx17(DialogPrimitive2.Title, { ref, className: cn("text-lg font-bold text-white", className), ...props }));
DrawerTitle.displayName = "DrawerTitle";
var DrawerDescription = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx17(DialogPrimitive2.Description, { ref, className: cn("mt-2 text-sm text-aivent-muted", className), ...props }));
DrawerDescription.displayName = "DrawerDescription";

// src/components/ui/toast.tsx
import * as React15 from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { jsx as jsx18 } from "react/jsx-runtime";
var ToastProvider = ToastPrimitive.Provider;
var ToastViewport = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx18(
  ToastPrimitive.Viewport,
  {
    ref,
    className: cn(
      "fixed bottom-4 right-4 z-50 flex max-h-screen w-[min(360px,calc(100vw-2rem))] flex-col gap-2 outline-none",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = "ToastViewport";
var Toast = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx18(ToastInner, { ref, className, ...props }));
Toast.displayName = "Toast";
var ToastInner = React15.forwardRef(({ className, ...props }, ref) => {
  const motion = useAiventMotion();
  return /* @__PURE__ */ jsx18(
    ToastPrimitive.Root,
    {
      ref,
      className: cn(
        "group pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-xl2 border border-aivent-border bg-aivent-panel p-4 text-aivent-text shadow-glow",
        motion.enabled ? "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-2" : "",
        className
      ),
      ...props
    }
  );
});
ToastInner.displayName = "ToastInner";
var ToastTitle = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx18(ToastPrimitive.Title, { ref, className: cn("text-sm font-bold text-white", className), ...props }));
ToastTitle.displayName = "ToastTitle";
var ToastDescription = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx18(ToastPrimitive.Description, { ref, className: cn("text-sm text-aivent-muted", className), ...props }));
ToastDescription.displayName = "ToastDescription";
var ToastAction = ToastPrimitive.Action;
var ToastClose = ToastPrimitive.Close;

// src/components/ui/checkbox.tsx
import * as React16 from "react";
import { jsx as jsx19, jsxs as jsxs6 } from "react/jsx-runtime";
function useControllableState({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React16.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React16.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function checkboxSizeClass(size) {
  switch (size) {
    case "small":
      return "h-4 w-4";
    case "large":
      return "h-6 w-6";
    case "middle":
    default:
      return "h-5 w-5";
  }
}
function statusClass(status, invalid) {
  if (invalid || status === "error") return "border-red-500/80";
  if (status === "warning") return "border-yellow-500/80";
  return "border-aivent-border";
}
var CheckboxContext = React16.createContext(null);
var CheckboxRoot = React16.forwardRef(
  ({
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    invalid,
    status,
    size = "middle",
    className,
    children,
    onClick,
    onKeyDown,
    type = "button",
    ...props
  }, ref) => {
    const [isChecked, setIsChecked] = useControllableState({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onCheckedChange
    });
    const checkedRef = React16.useRef(isChecked);
    React16.useEffect(() => {
      checkedRef.current = isChecked;
    }, [isChecked]);
    const toggle = React16.useCallback(() => {
      if (disabled) return;
      const next = !checkedRef.current;
      checkedRef.current = next;
      setIsChecked(next);
    }, [disabled, setIsChecked]);
    const ignoreNextClickRef = React16.useRef(false);
    return /* @__PURE__ */ jsx19(CheckboxContext.Provider, { value: { checked: isChecked, disabled, setChecked: setIsChecked }, children: /* @__PURE__ */ jsx19(
      "button",
      {
        ref,
        type,
        role: "checkbox",
        "aria-checked": isChecked,
        "aria-disabled": disabled || void 0,
        "aria-invalid": invalid || status === "error" ? true : void 0,
        "data-state": isChecked ? "checked" : "unchecked",
        "data-disabled": disabled ? "" : void 0,
        disabled,
        className: cn(
          "inline-flex items-center justify-center rounded-md border bg-aivent-panel text-aivent-text outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          checkboxSizeClass(size),
          statusClass(status, invalid),
          disabled ? "opacity-50" : "hover:bg-white/5",
          className
        ),
        onClick: (e) => {
          if (ignoreNextClickRef.current) {
            ignoreNextClickRef.current = false;
            onClick?.(e);
            return;
          }
          ignoreNextClickRef.current = false;
          toggle();
          onClick?.(e);
        },
        onKeyDown: (e) => {
          if (e.key === " " || e.key === "Spacebar" || e.key === "Space") {
            e.preventDefault();
            ignoreNextClickRef.current = true;
            toggle();
            window.setTimeout(() => {
              ignoreNextClickRef.current = false;
            }, 0);
          }
          onKeyDown?.(e);
        },
        ...props,
        children
      }
    ) });
  }
);
CheckboxRoot.displayName = "CheckboxRoot";
var CheckboxIndicator = React16.forwardRef(
  ({ className, ...props }, ref) => {
    const ctx = React16.useContext(CheckboxContext);
    if (!ctx) return null;
    const { checked } = ctx;
    return /* @__PURE__ */ jsx19(
      "span",
      {
        ref,
        "aria-hidden": "true",
        className: cn(
          "pointer-events-none grid place-items-center text-white",
          // always reserve space; fade icon
          checked ? "opacity-100" : "opacity-0",
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsx19("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx19(
          "path",
          {
            d: "M13.5 4.5L6.5 11.5L2.5 7.5",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) })
      }
    );
  }
);
CheckboxIndicator.displayName = "CheckboxIndicator";
function Checkbox({ value, defaultValue, onChange, children, className, ...props }) {
  return /* @__PURE__ */ jsxs6(
    CheckboxRoot,
    {
      checked: value,
      defaultChecked: defaultValue,
      onCheckedChange: onChange,
      className: cn("gap-2 px-2", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx19(CheckboxIndicator, {}),
        children ? /* @__PURE__ */ jsx19("span", { className: "select-none text-sm", children }) : null
      ]
    }
  );
}

// src/components/ui/radio-group.tsx
import * as React17 from "react";
import { jsx as jsx20, jsxs as jsxs7 } from "react/jsx-runtime";
function useControllableState2({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React17.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React17.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function statusClass2(status, invalid) {
  if (invalid || status === "error") return "border-red-500/80";
  if (status === "warning") return "border-yellow-500/80";
  return "border-aivent-border";
}
function itemSizeClass(size) {
  switch (size) {
    case "small":
      return "h-4 w-4";
    case "large":
      return "h-6 w-6";
    case "middle":
    default:
      return "h-5 w-5";
  }
}
var RadioGroupContext = React17.createContext(null);
var RadioGroupRoot = React17.forwardRef(
  ({
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    status,
    size = "middle",
    invalid,
    className,
    onKeyDown,
    ...props
  }, ref) => {
    const [v, setV] = useControllableState2({
      value,
      defaultValue,
      onChange: (next) => {
        if (next !== void 0) onValueChange?.(next);
      }
    });
    const localRef = React17.useRef(null);
    React17.useImperativeHandle(ref, () => localRef.current);
    const moveFocusAndSelect = React17.useCallback(
      (dir) => {
        const root = localRef.current;
        if (!root) return;
        const items = Array.from(root.querySelectorAll('[data-radio-item="true"]')).filter((el) => el.getAttribute("data-disabled") !== "true").filter((el) => !el.hasAttribute("disabled"));
        if (!items.length) return;
        const active = document.activeElement;
        const currentIndex = active ? items.indexOf(active) : -1;
        const selectedIndex = v ? items.findIndex((el) => el.getAttribute("data-value") === v) : -1;
        const base = currentIndex >= 0 ? currentIndex : selectedIndex >= 0 ? selectedIndex : 0;
        let nextIndex = base;
        if (dir === "first") nextIndex = 0;
        else if (dir === "last") nextIndex = items.length - 1;
        else if (dir === "prev") nextIndex = (base - 1 + items.length) % items.length;
        else nextIndex = (base + 1) % items.length;
        const nextEl = items[nextIndex];
        nextEl.focus();
        const nextValue = nextEl.getAttribute("data-value");
        if (nextValue) setV(nextValue);
      },
      [setV, v]
    );
    return /* @__PURE__ */ jsx20(RadioGroupContext.Provider, { value: { value: v, setValue: setV, disabled, status, size, invalid }, children: /* @__PURE__ */ jsx20(
      "div",
      {
        ref: localRef,
        role: "radiogroup",
        "aria-disabled": disabled || void 0,
        "aria-invalid": invalid || status === "error" ? true : void 0,
        className: cn("flex flex-col gap-2", className),
        onKeyDown: (e) => {
          if (disabled) return;
          switch (e.key) {
            case "ArrowUp":
            case "ArrowLeft":
              e.preventDefault();
              moveFocusAndSelect("prev");
              break;
            case "ArrowDown":
            case "ArrowRight":
              e.preventDefault();
              moveFocusAndSelect("next");
              break;
            case "Home":
              e.preventDefault();
              moveFocusAndSelect("first");
              break;
            case "End":
              e.preventDefault();
              moveFocusAndSelect("last");
              break;
          }
          onKeyDown?.(e);
        },
        ...props
      }
    ) });
  }
);
RadioGroupRoot.displayName = "RadioGroupRoot";
var RadioGroupItem = React17.forwardRef(
  ({ value, disabled: itemDisabled = false, className, children, onClick, onKeyDown, type = "button", ...props }, ref) => {
    const ctx = React17.useContext(RadioGroupContext);
    if (!ctx) throw new Error("RadioGroupItem must be used within RadioGroupRoot");
    const disabled = ctx.disabled || itemDisabled;
    const checked = ctx.value === value;
    return /* @__PURE__ */ jsxs7(
      "button",
      {
        ref,
        type,
        role: "radio",
        "aria-checked": checked,
        "aria-disabled": disabled || void 0,
        "data-radio-item": "true",
        "data-value": value,
        "data-disabled": disabled ? "true" : "false",
        disabled,
        className: cn(
          "group inline-flex items-center gap-2 rounded-lg px-2 py-1 text-left text-aivent-text outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          disabled ? "opacity-50" : "hover:bg-white/5",
          className
        ),
        onClick: (e) => {
          if (!disabled) ctx.setValue(value);
          onClick?.(e);
        },
        onKeyDown: (e) => {
          if (!disabled && (e.key === " " || e.key === "Enter")) {
            e.preventDefault();
            ctx.setValue(value);
          }
          onKeyDown?.(e);
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx20(
            "span",
            {
              "aria-hidden": "true",
              className: cn(
                "grid place-items-center rounded-full border bg-aivent-panel",
                itemSizeClass(ctx.size),
                statusClass2(ctx.status, ctx.invalid),
                checked ? "text-white" : "text-transparent"
              ),
              children: /* @__PURE__ */ jsx20("span", { className: cn("block rounded-full bg-current", ctx.size === "small" ? "h-1.5 w-1.5" : ctx.size === "large" ? "h-2.5 w-2.5" : "h-2 w-2") })
            }
          ),
          children ? /* @__PURE__ */ jsx20("span", { className: "select-none text-sm", children }) : null
        ]
      }
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";
function RadioGroup2({ options, value, defaultValue, onChange, ...props }) {
  return /* @__PURE__ */ jsx20(RadioGroupRoot, { value, defaultValue, onValueChange: onChange, ...props, children: options.map((opt) => /* @__PURE__ */ jsx20(RadioGroupItem, { value: opt.value, disabled: opt.disabled, children: opt.label }, opt.value)) });
}

// src/components/ui/switch.tsx
import * as React18 from "react";
import { jsx as jsx21 } from "react/jsx-runtime";
function useControllableState3({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React18.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React18.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function statusClass3(status, invalid) {
  if (invalid || status === "error") return "ring-red-500/40";
  if (status === "warning") return "ring-yellow-500/40";
  return "";
}
function switchSizeClass(size) {
  switch (size) {
    case "small":
      return { root: "h-5 w-9", thumb: "h-4 w-4", on: "translate-x-4" };
    case "large":
      return { root: "h-7 w-12", thumb: "h-6 w-6", on: "translate-x-5" };
    case "middle":
    default:
      return { root: "h-6 w-10", thumb: "h-5 w-5", on: "translate-x-4" };
  }
}
var SwitchContext = React18.createContext(null);
var SwitchRoot = React18.forwardRef(
  ({
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    status,
    size = "middle",
    invalid,
    className,
    children,
    onClick,
    onKeyDown,
    type = "button",
    ...props
  }, ref) => {
    const [isChecked, setIsChecked] = useControllableState3({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onCheckedChange
    });
    const sizes = switchSizeClass(size);
    const toggle = React18.useCallback(() => {
      if (disabled) return;
      setIsChecked(!isChecked);
    }, [disabled, isChecked, setIsChecked]);
    return /* @__PURE__ */ jsx21(SwitchContext.Provider, { value: { checked: isChecked, disabled, size }, children: /* @__PURE__ */ jsx21(
      "button",
      {
        ref,
        type,
        role: "switch",
        "aria-checked": isChecked,
        "aria-disabled": disabled || void 0,
        "aria-invalid": invalid || status === "error" ? true : void 0,
        "data-state": isChecked ? "checked" : "unchecked",
        disabled,
        className: cn(
          "relative inline-flex items-center rounded-full border border-aivent-border bg-aivent-panel outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          sizes.root,
          isChecked ? "bg-white/10" : "",
          disabled ? "opacity-50" : "hover:bg-white/5",
          statusClass3(status, invalid),
          className
        ),
        onClick: (e) => {
          toggle();
          onClick?.(e);
        },
        onKeyDown: (e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
          }
          onKeyDown?.(e);
        },
        ...props,
        children
      }
    ) });
  }
);
SwitchRoot.displayName = "SwitchRoot";
var SwitchThumb = React18.forwardRef(({ className, ...props }, ref) => {
  const ctx = React18.useContext(SwitchContext);
  if (!ctx) return null;
  const sizes = switchSizeClass(ctx.size);
  return /* @__PURE__ */ jsx21(
    "span",
    {
      ref,
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform",
        sizes.thumb,
        ctx.checked ? sizes.on : "translate-x-0",
        className
      ),
      ...props
    }
  );
});
SwitchThumb.displayName = "SwitchThumb";
function Switch({ value, defaultValue, onChange, className, ...props }) {
  return /* @__PURE__ */ jsx21(SwitchRoot, { checked: value, defaultChecked: defaultValue, onCheckedChange: onChange, className: cn("px-0", className), ...props, children: /* @__PURE__ */ jsx21(SwitchThumb, {}) });
}

// src/components/ui/select.tsx
import * as React19 from "react";
import { createPortal } from "react-dom";
import { jsx as jsx22, jsxs as jsxs8 } from "react/jsx-runtime";
function useControllableState4({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React19.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React19.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function statusClass4(status, invalid) {
  if (invalid || status === "error") return "border-red-500/80";
  if (status === "warning") return "border-yellow-500/80";
  return "border-aivent-border";
}
function triggerSizeClass(size) {
  switch (size) {
    case "small":
      return "h-8 px-3 text-sm";
    case "large":
      return "h-11 px-4 text-base";
    case "middle":
    default:
      return "h-9 px-3.5 text-sm";
  }
}
var SelectContext = React19.createContext(null);
var SelectRoot = React19.forwardRef(
  ({
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    status,
    size = "middle",
    invalid,
    placeholder,
    className,
    ...props
  }, ref) => {
    const [v, setV] = useControllableState4({
      value,
      defaultValue,
      onChange: (next) => {
        if (next !== void 0) onValueChange?.(next);
      }
    });
    const [open, setOpen] = React19.useState(false);
    const triggerRef = React19.useRef(null);
    const contentRef = React19.useRef(null);
    const labelsRef = React19.useRef(/* @__PURE__ */ new Map());
    React19.useEffect(() => {
      if (!open) return;
      const onPointerDown = (e) => {
        const t = e.target;
        if (triggerRef.current?.contains(t)) return;
        if (contentRef.current?.contains(t)) return;
        setOpen(false);
      };
      window.addEventListener("pointerdown", onPointerDown);
      return () => window.removeEventListener("pointerdown", onPointerDown);
    }, [open]);
    const registerLabel = React19.useCallback((val, label) => {
      labelsRef.current.set(val, label);
    }, []);
    const getLabel = React19.useCallback((val) => val ? labelsRef.current.get(val) : void 0, []);
    const ctx = React19.useMemo(
      () => ({
        open,
        setOpen,
        value: v,
        setValue: setV,
        disabled,
        status,
        size,
        invalid,
        placeholder,
        triggerRef,
        contentRef,
        registerLabel,
        getLabel
      }),
      [disabled, getLabel, invalid, open, placeholder, registerLabel, setV, size, status, v]
    );
    return /* @__PURE__ */ jsx22(SelectContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx22("div", { ref, className: cn("inline-flex", className), ...props }) });
  }
);
SelectRoot.displayName = "SelectRoot";
var SelectTrigger = React19.forwardRef(
  ({ className, children, onClick, onKeyDown, type = "button", ...props }, ref) => {
    const ctx = React19.useContext(SelectContext);
    if (!ctx) throw new Error("SelectTrigger must be used within SelectRoot");
    return /* @__PURE__ */ jsx22(
      "button",
      {
        ref: (node) => {
          ctx.triggerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        type,
        "aria-haspopup": "listbox",
        "aria-expanded": ctx.open,
        "aria-disabled": ctx.disabled || void 0,
        "aria-invalid": ctx.invalid || ctx.status === "error" ? true : void 0,
        disabled: ctx.disabled,
        className: cn(
          "inline-flex min-w-44 items-center justify-between gap-3 rounded-lg border bg-aivent-panel text-aivent-text outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          triggerSizeClass(ctx.size),
          statusClass4(ctx.status, ctx.invalid),
          ctx.disabled ? "opacity-50" : "hover:bg-white/5",
          className
        ),
        onClick: (e) => {
          if (!ctx.disabled) ctx.setOpen(!ctx.open);
          onClick?.(e);
        },
        onKeyDown: (e) => {
          if (ctx.disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            ctx.setOpen(true);
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            ctx.setOpen(true);
          }
          onKeyDown?.(e);
        },
        ...props,
        children
      }
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";
var SelectValue = React19.forwardRef(({ className, placeholder, ...props }, ref) => {
  const ctx = React19.useContext(SelectContext);
  if (!ctx) throw new Error("SelectValue must be used within SelectRoot");
  const label = ctx.getLabel(ctx.value);
  const fallbackValue = ctx.value ? ctx.value : null;
  const show = label ?? fallbackValue ?? placeholder ?? ctx.placeholder;
  const hasValue = label != null || fallbackValue != null;
  return /* @__PURE__ */ jsx22("span", { ref, className: cn("truncate text-left", hasValue ? "text-aivent-text" : "text-aivent-muted", className), ...props, children: show });
});
SelectValue.displayName = "SelectValue";
var SelectContent = React19.forwardRef(
  ({ className, children, onKeyDown, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }, ref) => {
    const ctx = React19.useContext(SelectContext);
    if (!ctx) throw new Error("SelectContent must be used within SelectRoot");
    React19.useEffect(() => {
      if (!ctx.open) return;
      const root = ctx.contentRef.current;
      if (!root) return;
      const selected = ctx.value ? root.querySelector(`[data-value="${CSS.escape(ctx.value)}"]`) : null;
      const firstEnabled = root.querySelector('[data-select-item="true"]:not([data-disabled="true"])');
      (selected ?? firstEnabled)?.focus();
    }, [ctx.open, ctx.value, ctx.contentRef]);
    if (!ctx.open) return null;
    const el = /* @__PURE__ */ jsx22(
      "div",
      {
        ref: (node) => {
          ctx.contentRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        role: "listbox",
        "aria-label": ariaLabel ?? (ariaLabelledBy ? void 0 : "Select options"),
        tabIndex: -1,
        className: cn(
          "z-50 mt-2 min-w-44 overflow-hidden rounded-xl2 border border-aivent-border bg-aivent-panel p-1 text-sm text-aivent-text shadow-glow outline-none",
          className
        ),
        onKeyDown: (e) => {
          const root = ctx.contentRef.current;
          if (!root) return;
          const items = Array.from(root.querySelectorAll('[data-select-item="true"]')).filter(
            (n) => n.getAttribute("data-disabled") !== "true"
          );
          const active = document.activeElement;
          const idx = active ? items.indexOf(active) : -1;
          const focusAt = (nextIdx) => {
            const el2 = items[nextIdx];
            el2?.focus();
          };
          if (e.key === "Escape") {
            e.preventDefault();
            ctx.setOpen(false);
            ctx.triggerRef.current?.focus();
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            focusAt(Math.min(items.length - 1, idx >= 0 ? idx + 1 : 0));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            focusAt(Math.max(0, idx >= 0 ? idx - 1 : items.length - 1));
          }
          if (e.key === "Home") {
            e.preventDefault();
            focusAt(0);
          }
          if (e.key === "End") {
            e.preventDefault();
            focusAt(items.length - 1);
          }
          if (e.key === "Enter" || e.key === " ") {
            const val = active?.getAttribute?.("data-value");
            if (val) {
              e.preventDefault();
              ctx.setValue(val);
              ctx.setOpen(false);
              ctx.triggerRef.current?.focus();
            }
          }
          onKeyDown?.(e);
        },
        ...props,
        children
      }
    );
    return createPortal(el, document.body);
  }
);
SelectContent.displayName = "SelectContent";
var SelectItem = React19.forwardRef(
  ({ value, disabled: itemDisabled = false, textValue, className, children, onClick, type = "button", ...props }, ref) => {
    const ctx = React19.useContext(SelectContext);
    if (!ctx) throw new Error("SelectItem must be used within SelectRoot");
    const disabled = ctx.disabled || itemDisabled;
    const selected = ctx.value === value;
    React19.useEffect(() => {
      ctx.registerLabel(value, children ?? textValue ?? value);
    }, [children, ctx, textValue, value]);
    return /* @__PURE__ */ jsxs8(
      "button",
      {
        ref,
        type,
        role: "option",
        "aria-selected": selected,
        "aria-disabled": disabled || void 0,
        tabIndex: -1,
        "data-select-item": "true",
        "data-value": value,
        "data-disabled": disabled ? "true" : "false",
        disabled,
        className: cn(
          "flex w-full cursor-default select-none items-center justify-between rounded-lg px-3 py-2 text-left outline-none transition",
          "focus:bg-white/10 data-[selected=true]:bg-white/10 data-[selected=true]:text-white",
          disabled ? "opacity-40" : "",
          className
        ),
        "data-selected": selected ? "true" : "false",
        onClick: (e) => {
          if (!disabled) {
            ctx.setValue(value);
            ctx.setOpen(false);
            ctx.triggerRef.current?.focus();
          }
          onClick?.(e);
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx22("span", { className: "truncate", children }),
          selected ? /* @__PURE__ */ jsx22("span", { "aria-hidden": "true", className: "ml-3 text-white", children: "\u2713" }) : null
        ]
      }
    );
  }
);
SelectItem.displayName = "SelectItem";
function Select({ options, value, defaultValue, onChange, placeholder, ...props }) {
  return /* @__PURE__ */ jsxs8(SelectRoot, { value, defaultValue, onValueChange: onChange, placeholder, ...props, children: [
    /* @__PURE__ */ jsxs8(SelectTrigger, { children: [
      /* @__PURE__ */ jsx22(SelectValue, { placeholder }),
      /* @__PURE__ */ jsx22("span", { "aria-hidden": "true", className: "text-white/60", children: "\u25BE" })
    ] }),
    /* @__PURE__ */ jsx22(SelectContent, { children: options.map((opt) => /* @__PURE__ */ jsx22(SelectItem, { value: opt.value, disabled: opt.disabled, children: opt.label }, opt.value)) })
  ] });
}

// src/components/ui/tabs.tsx
import * as React20 from "react";
import { jsx as jsx23, jsxs as jsxs9 } from "react/jsx-runtime";
function useControllableState5({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React20.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React20.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function statusClass5(status, invalid) {
  if (invalid || status === "error") return "border-red-500/80";
  if (status === "warning") return "border-yellow-500/80";
  return "border-aivent-border";
}
function triggerSizeClass2(size) {
  switch (size) {
    case "small":
      return "px-3 py-1 text-sm";
    case "large":
      return "px-4 py-2 text-base";
    case "middle":
    default:
      return "px-3.5 py-1.5 text-sm";
  }
}
var TabsContext = React20.createContext(null);
var TabsRoot = React20.forwardRef(
  ({ value, defaultValue, onValueChange, disabled = false, status, size = "middle", invalid, className, ...props }, ref) => {
    const [v, setV] = useControllableState5({
      value,
      defaultValue,
      onChange: onValueChange
    });
    const baseId = React20.useId();
    return /* @__PURE__ */ jsx23(TabsContext.Provider, { value: { value: v, setValue: setV, disabled, status, size, invalid, baseId }, children: /* @__PURE__ */ jsx23("div", { ref, className: cn("w-full", className), ...props }) });
  }
);
TabsRoot.displayName = "TabsRoot";
var TabsList = React20.forwardRef(({ className, onKeyDown, ...props }, ref) => {
  const ctx = React20.useContext(TabsContext);
  if (!ctx) throw new Error("TabsList must be used within TabsRoot");
  const listRef = React20.useRef(null);
  React20.useImperativeHandle(ref, () => listRef.current);
  const moveFocusAndActivate = (dir) => {
    const container = listRef.current ?? document.activeElement?.closest?.('[role="tablist"]');
    if (!container) return;
    const tabs = Array.from(container.querySelectorAll('[data-tabs-trigger="true"]')).filter(
      (el2) => el2.getAttribute("data-disabled") !== "true"
    );
    if (!tabs.length) return;
    const active = document.activeElement;
    const idx = active ? tabs.indexOf(active) : tabs.findIndex((t) => t.getAttribute("data-value") === ctx.value);
    const base = idx >= 0 ? idx : 0;
    let next = base;
    if (dir === "first") next = 0;
    else if (dir === "last") next = tabs.length - 1;
    else if (dir === "prev") next = (base - 1 + tabs.length) % tabs.length;
    else next = (base + 1) % tabs.length;
    const el = tabs[next];
    el.focus();
    const val = el.getAttribute("data-value");
    if (val) ctx.setValue(val);
  };
  return /* @__PURE__ */ jsx23(
    "div",
    {
      ref: listRef,
      role: "tablist",
      "aria-disabled": ctx.disabled || void 0,
      className: cn("inline-flex items-center gap-1 rounded-xl2 border bg-aivent-panel p-1", statusClass5(ctx.status, ctx.invalid), className),
      onKeyDown: (e) => {
        if (ctx.disabled) return;
        switch (e.key) {
          case "ArrowLeft":
          case "ArrowUp":
            e.preventDefault();
            moveFocusAndActivate("prev");
            break;
          case "ArrowRight":
          case "ArrowDown":
            e.preventDefault();
            moveFocusAndActivate("next");
            break;
          case "Home":
            e.preventDefault();
            moveFocusAndActivate("first");
            break;
          case "End":
            e.preventDefault();
            moveFocusAndActivate("last");
            break;
        }
        onKeyDown?.(e);
      },
      ...props
    }
  );
});
TabsList.displayName = "TabsList";
var TabsTrigger = React20.forwardRef(
  ({ value, disabled: itemDisabled = false, className, children, onClick, type = "button", ...props }, ref) => {
    const ctx = React20.useContext(TabsContext);
    if (!ctx) throw new Error("TabsTrigger must be used within TabsRoot");
    const disabled = ctx.disabled || itemDisabled;
    const selected = ctx.value === value;
    const triggerId = `${ctx.baseId}-trigger-${value}`;
    const panelId = `${ctx.baseId}-panel-${value}`;
    return /* @__PURE__ */ jsx23(
      "button",
      {
        ref,
        type,
        role: "tab",
        id: triggerId,
        "aria-controls": panelId,
        "aria-selected": selected,
        "aria-disabled": disabled || void 0,
        tabIndex: selected ? 0 : -1,
        "data-tabs-trigger": "true",
        "data-value": value,
        "data-disabled": disabled ? "true" : "false",
        disabled,
        className: cn(
          "rounded-lg text-aivent-text outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          triggerSizeClass2(ctx.size),
          selected ? "bg-white/10 text-white" : "hover:bg-white/5",
          disabled ? "opacity-40" : "",
          className
        ),
        onClick: (e) => {
          if (!disabled) ctx.setValue(value);
          onClick?.(e);
        },
        ...props,
        children
      }
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React20.forwardRef(({ value, className, children, ...props }, ref) => {
  const ctx = React20.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within TabsRoot");
  const selected = ctx.value === value;
  const triggerId = `${ctx.baseId}-trigger-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;
  return /* @__PURE__ */ jsx23(
    "div",
    {
      ref,
      role: "tabpanel",
      id: panelId,
      "aria-labelledby": triggerId,
      hidden: !selected,
      className: cn("mt-4 rounded-xl2 border border-aivent-border bg-aivent-panel p-4 text-aivent-text", className),
      ...props,
      children: selected ? children : null
    }
  );
});
TabsContent.displayName = "TabsContent";
function Tabs({ options, value, defaultValue, onChange, ...props }) {
  const dv = defaultValue ?? options[0]?.value ?? "";
  return /* @__PURE__ */ jsxs9(TabsRoot, { value, defaultValue: dv, onValueChange: onChange, ...props, children: [
    /* @__PURE__ */ jsx23(TabsList, { children: options.map((t) => /* @__PURE__ */ jsx23(TabsTrigger, { value: t.value, disabled: t.disabled, children: t.label }, t.value)) }),
    options.map((t) => /* @__PURE__ */ jsx23(TabsContent, { value: t.value, children: t.content }, t.value))
  ] });
}

// src/components/ui/date-picker.tsx
import * as React21 from "react";
import { DayPicker } from "react-day-picker";
import { jsx as jsx24, jsxs as jsxs10 } from "react/jsx-runtime";
function useControllableState6({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React21.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React21.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function defaultFormat(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function DatePicker({
  value,
  defaultValue,
  onChange,
  disabled = false,
  placeholder = "\u8BF7\u9009\u62E9\u65E5\u671F",
  format = defaultFormat,
  dayPickerProps,
  className,
  ...buttonProps
}) {
  const [selected, setSelected] = useControllableState6({
    value,
    defaultValue,
    onChange
  });
  const [open, setOpen] = React21.useState(false);
  const label = selected ? format(selected) : placeholder;
  return /* @__PURE__ */ jsxs10(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx24(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs10(
      "button",
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-disabled": disabled || void 0,
        disabled,
        className: cn(
          "inline-flex h-11 min-w-56 items-center justify-between gap-3 rounded-lg border border-aivent-border bg-aivent-panel px-3 text-sm text-aivent-text outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50",
          selected ? "text-aivent-text" : "text-aivent-muted",
          className
        ),
        onClick: (e) => {
          if (!disabled) setOpen((v) => !v);
          buttonProps.onClick?.(e);
        },
        ...buttonProps,
        children: [
          /* @__PURE__ */ jsx24("span", { className: "truncate text-left", children: label }),
          /* @__PURE__ */ jsx24("span", { "aria-hidden": "true", className: "text-white/60", children: "\u25BE" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx24(PopoverContent, { className: "w-auto p-3", align: "start", "aria-label": "Date picker", children: /* @__PURE__ */ jsx24(
      DayPicker,
      {
        mode: "single",
        selected,
        onSelect: (d) => {
          setSelected(d);
          setOpen(false);
        },
        weekStartsOn: 1,
        showOutsideDays: true,
        classNames: {
          months: "flex flex-col",
          month: "space-y-3",
          caption: "flex items-center justify-between gap-2",
          caption_label: "text-sm font-semibold text-aivent-text",
          nav: "flex items-center gap-1",
          nav_button: "h-8 w-8 rounded-md border border-aivent-border bg-aivent-panel text-aivent-text transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "w-9 text-center text-xs font-medium text-aivent-muted",
          row: "flex w-full",
          cell: "h-9 w-9 p-0 text-center",
          day: cn(
            "h-9 w-9 rounded-md text-sm text-aivent-text transition",
            "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          ),
          day_today: "border border-aivent-secondary/60",
          day_selected: "bg-aivent-secondary text-slate-950 hover:bg-aivent-secondary",
          day_outside: "text-white/20",
          day_disabled: "opacity-30"
        },
        ...dayPickerProps
      }
    ) })
  ] });
}

// src/components/ui/upload.tsx
import { useDropzone } from "react-dropzone";
import { Fragment, jsx as jsx25, jsxs as jsxs11 } from "react/jsx-runtime";
function Upload({
  disabled = false,
  multiple = true,
  accept,
  maxSize,
  onDrop,
  className,
  children,
  ...props
}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    multiple,
    accept,
    maxSize,
    onDrop: (acceptedFiles) => {
      onDrop?.(acceptedFiles);
    }
  });
  const inputProps = getInputProps({ disabled });
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      ...getRootProps({
        role: "button",
        "aria-disabled": disabled || void 0,
        className: cn(
          "flex min-h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl2 border border-dashed bg-aivent-panel px-4 py-4 text-center outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          disabled ? "cursor-not-allowed opacity-50" : "hover:bg-white/5",
          isDragActive ? "border-aivent-secondary/70 bg-white/5" : "border-aivent-border",
          isDragReject ? "border-red-500/70" : "",
          className
        ),
        ...props
      }),
      children: [
        /* @__PURE__ */ jsx25("input", { ...inputProps }),
        children ?? /* @__PURE__ */ jsxs11(Fragment, { children: [
          /* @__PURE__ */ jsx25("div", { className: "text-sm font-semibold text-aivent-text", children: "\u4E0A\u4F20\u6587\u4EF6" }),
          /* @__PURE__ */ jsx25("div", { className: "text-xs text-aivent-muted", children: disabled ? "\u5F53\u524D\u4E0D\u53EF\u4E0A\u4F20" : isDragActive ? "\u677E\u5F00\u4EE5\u4E0A\u4F20" : "\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6" })
        ] })
      ]
    }
  );
}

// src/components/ui/pagination.tsx
import * as React22 from "react";
import { jsx as jsx26, jsxs as jsxs12 } from "react/jsx-runtime";
function useControllableState7({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React22.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React22.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}
function getPaginationTokens({
  page,
  pageCount,
  siblingCount
}) {
  if (pageCount <= 0) return [];
  const totalNumbers = siblingCount * 2 + 5;
  if (pageCount <= totalNumbers) return range(1, pageCount);
  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < pageCount - 1;
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + siblingCount * 2;
    return [...range(1, leftCount), "ellipsis", pageCount];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + siblingCount * 2;
    return [1, "ellipsis", ...range(pageCount - rightCount + 1, pageCount)];
  }
  return [1, "ellipsis", ...range(leftSibling, rightSibling), "ellipsis", pageCount];
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function Pagination({
  total,
  pageSize = 10,
  value,
  defaultValue = 1,
  onChange,
  siblingCount = 1,
  disabled = false,
  className,
  ...props
}) {
  const pageCount = Math.max(1, Math.ceil(Math.max(0, total) / Math.max(1, pageSize)));
  const [page, setPage] = useControllableState7({
    value,
    defaultValue: clamp(defaultValue, 1, pageCount),
    onChange
  });
  const current = clamp(page, 1, pageCount);
  const tokens = getPaginationTokens({ page: current, pageCount, siblingCount });
  const setPageSafe = (next) => {
    if (disabled) return;
    setPage(clamp(next, 1, pageCount));
  };
  return /* @__PURE__ */ jsx26(
    "nav",
    {
      "aria-label": "pagination",
      "aria-disabled": disabled || void 0,
      className: cn("inline-flex items-center", className),
      ...props,
      children: /* @__PURE__ */ jsxs12("ul", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsx26("li", { children: /* @__PURE__ */ jsx26(
          "button",
          {
            type: "button",
            "aria-label": "Previous page",
            disabled: disabled || current <= 1,
            className: cn(
              "h-9 rounded-lg border px-3 text-sm text-aivent-text outline-none transition",
              "focus-visible:ring-2 focus-visible:ring-white/20",
              "border-aivent-border bg-aivent-panel hover:bg-white/5 disabled:pointer-events-none disabled:opacity-40"
            ),
            onClick: () => setPageSafe(current - 1),
            children: "Prev"
          }
        ) }),
        tokens.map((t, idx) => {
          if (t === "ellipsis") {
            return /* @__PURE__ */ jsx26("li", { "aria-hidden": "true", className: "px-2 text-aivent-text/60", children: "\u2026" }, `e-${idx}`);
          }
          const p = t;
          const active = p === current;
          return /* @__PURE__ */ jsx26("li", { children: /* @__PURE__ */ jsx26(
            "button",
            {
              type: "button",
              "aria-label": `Page ${p}`,
              "aria-current": active ? "page" : void 0,
              disabled,
              className: cn(
                "h-9 min-w-9 rounded-lg border px-3 text-sm outline-none transition",
                "focus-visible:ring-2 focus-visible:ring-white/20",
                active ? "border-white/15 bg-white/10 text-white" : "border-aivent-border bg-aivent-panel text-aivent-text hover:bg-white/5",
                disabled ? "opacity-40" : ""
              ),
              onClick: () => setPageSafe(p),
              children: p
            }
          ) }, p);
        }),
        /* @__PURE__ */ jsx26("li", { children: /* @__PURE__ */ jsx26(
          "button",
          {
            type: "button",
            "aria-label": "Next page",
            disabled: disabled || current >= pageCount,
            className: cn(
              "h-9 rounded-lg border px-3 text-sm text-aivent-text outline-none transition",
              "focus-visible:ring-2 focus-visible:ring-white/20",
              "border-aivent-border bg-aivent-panel hover:bg-white/5 disabled:pointer-events-none disabled:opacity-40"
            ),
            onClick: () => setPageSafe(current + 1),
            children: "Next"
          }
        ) })
      ] })
    }
  );
}

// src/components/ui/collapse.tsx
import * as React23 from "react";
import { jsx as jsx27, jsxs as jsxs13 } from "react/jsx-runtime";
function useControllableState8({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React23.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React23.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function statusClass6(status, invalid) {
  if (invalid || status === "error") return "border-red-500/80";
  if (status === "warning") return "border-yellow-500/80";
  return "border-aivent-border";
}
var CollapseContext = React23.createContext(null);
var CollapseItemContext = React23.createContext(null);
var CollapseRoot = React23.forwardRef(
  ({
    value,
    defaultValue = [],
    onValueChange,
    disabled = false,
    multiple = true,
    status,
    invalid,
    className,
    ...props
  }, ref) => {
    const [v, setV] = useControllableState8({
      value,
      defaultValue,
      onChange: onValueChange
    });
    const baseId = React23.useId();
    return /* @__PURE__ */ jsx27(CollapseContext.Provider, { value: { value: v, setValue: setV, disabled, multiple, status, invalid, baseId }, children: /* @__PURE__ */ jsx27(
      "div",
      {
        ref,
        "aria-disabled": disabled || void 0,
        className: cn("rounded-xl2 border bg-aivent-panel", statusClass6(status, invalid), className),
        ...props
      }
    ) });
  }
);
CollapseRoot.displayName = "CollapseRoot";
var CollapseItem = React23.forwardRef(
  ({ value, disabled: itemDisabled = false, className, ...props }, ref) => {
    const ctx = React23.useContext(CollapseContext);
    if (!ctx) throw new Error("CollapseItem must be used within CollapseRoot");
    const disabled = ctx.disabled || itemDisabled;
    const open = ctx.value.includes(value);
    const triggerId = `${ctx.baseId}-collapse-trigger-${value}`;
    const contentId = `${ctx.baseId}-collapse-content-${value}`;
    const toggle = () => {
      if (disabled) return;
      if (ctx.multiple) {
        ctx.setValue(open ? ctx.value.filter((k) => k !== value) : [...ctx.value, value]);
      } else {
        ctx.setValue(open ? [] : [value]);
      }
    };
    return /* @__PURE__ */ jsx27(CollapseItemContext.Provider, { value: { itemValue: value, itemDisabled: disabled, open, triggerId, contentId, toggle }, children: /* @__PURE__ */ jsx27(
      "div",
      {
        ref,
        "data-state": open ? "open" : "closed",
        "data-disabled": disabled ? "" : void 0,
        className: cn("border-t border-aivent-border first:border-t-0", className),
        ...props
      }
    ) });
  }
);
CollapseItem.displayName = "CollapseItem";
var CollapseTrigger = React23.forwardRef(
  ({ className, type = "button", children, onClick, ...props }, ref) => {
    const item = React23.useContext(CollapseItemContext);
    if (!item) throw new Error("CollapseTrigger must be used within CollapseItem");
    return /* @__PURE__ */ jsxs13(
      "button",
      {
        ref,
        type,
        id: item.triggerId,
        "aria-controls": item.contentId,
        "aria-expanded": item.open,
        "aria-disabled": item.itemDisabled || void 0,
        disabled: item.itemDisabled,
        className: cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-aivent-text outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          item.itemDisabled ? "opacity-40" : "hover:bg-white/5",
          className
        ),
        onClick: (e) => {
          item.toggle();
          onClick?.(e);
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx27("span", { children }),
          /* @__PURE__ */ jsx27("span", { "aria-hidden": "true", className: cn("transition-transform", item.open ? "rotate-180" : "rotate-0"), children: /* @__PURE__ */ jsx27("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx27("path", { d: "M4 6L8 10L12 6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
        ]
      }
    );
  }
);
CollapseTrigger.displayName = "CollapseTrigger";
var CollapseContent = React23.forwardRef(
  ({ className, children, ...props }, ref) => {
    const item = React23.useContext(CollapseItemContext);
    if (!item) throw new Error("CollapseContent must be used within CollapseItem");
    return /* @__PURE__ */ jsx27(
      "div",
      {
        ref,
        id: item.contentId,
        role: "region",
        "aria-labelledby": item.triggerId,
        hidden: !item.open,
        className: cn("px-4 pb-4 text-sm text-aivent-text/80", className),
        ...props,
        children: item.open ? children : null
      }
    );
  }
);
CollapseContent.displayName = "CollapseContent";
function Collapse({ items, value, defaultValue, onChange, ...props }) {
  return /* @__PURE__ */ jsx27(CollapseRoot, { value, defaultValue: defaultValue ?? [], onValueChange: onChange, ...props, children: items.map((it) => /* @__PURE__ */ jsxs13(CollapseItem, { value: it.key, disabled: it.disabled, children: [
    /* @__PURE__ */ jsx27(CollapseTrigger, { children: it.label }),
    /* @__PURE__ */ jsx27(CollapseContent, { children: it.content })
  ] }, it.key)) });
}

// src/components/ui/breadcrumb.tsx
import * as React24 from "react";
import { jsx as jsx28, jsxs as jsxs14 } from "react/jsx-runtime";
var Breadcrumb = React24.forwardRef(
  ({ items, separator = "/", disabled = false, className, ...props }, ref) => {
    return /* @__PURE__ */ jsx28("nav", { ref, "aria-label": "breadcrumb", "aria-disabled": disabled || void 0, className: cn("text-sm", className), ...props, children: /* @__PURE__ */ jsx28("ol", { className: "flex flex-wrap items-center gap-1 text-aivent-text/80", children: items.map((item, idx) => {
      const last = idx === items.length - 1;
      const itemDisabled = disabled || Boolean(item.disabled);
      const content = last ? /* @__PURE__ */ jsx28("span", { "aria-current": "page", className: "font-semibold text-white", children: item.label }) : item.href ? /* @__PURE__ */ jsx28(
        "a",
        {
          href: item.href,
          onClick: itemDisabled ? void 0 : item.onClick,
          "aria-disabled": itemDisabled || void 0,
          className: cn("transition hover:text-white", itemDisabled ? "pointer-events-none opacity-50" : ""),
          children: item.label
        }
      ) : item.onClick ? /* @__PURE__ */ jsx28(
        "button",
        {
          type: "button",
          onClick: itemDisabled ? void 0 : item.onClick,
          disabled: itemDisabled,
          className: cn("transition hover:text-white", itemDisabled ? "opacity-50" : ""),
          children: item.label
        }
      ) : /* @__PURE__ */ jsx28("span", { className: cn(itemDisabled ? "opacity-50" : ""), children: item.label });
      return /* @__PURE__ */ jsxs14("li", { className: "inline-flex items-center gap-1", children: [
        content,
        !last ? /* @__PURE__ */ jsx28("span", { "aria-hidden": "true", className: "px-1 text-aivent-text/40", children: separator }) : null
      ] }, idx);
    }) }) });
  }
);
Breadcrumb.displayName = "Breadcrumb";

// src/components/ui/empty.tsx
import * as React25 from "react";
import { jsx as jsx29, jsxs as jsxs15 } from "react/jsx-runtime";
function emptySizeClass(size) {
  switch (size) {
    case "small":
      return {
        root: "px-5 py-8 gap-3",
        iconWrap: "h-12 w-12 text-[26px]",
        title: "text-sm",
        description: "text-xs",
        actions: "mt-3"
      };
    case "large":
      return {
        root: "px-10 py-14 gap-4",
        iconWrap: "h-16 w-16 text-[34px]",
        title: "text-lg",
        description: "text-sm",
        actions: "mt-5"
      };
    case "middle":
    default:
      return {
        root: "px-8 py-12 gap-4",
        iconWrap: "h-14 w-14 text-[30px]",
        title: "text-base",
        description: "text-sm",
        actions: "mt-4"
      };
  }
}
var Empty = React25.forwardRef(function Empty2({ className, icon, title, description, actions, size = "middle", useStatusRole = false, role, ...props }, ref) {
  const s = emptySizeClass(size);
  return /* @__PURE__ */ jsxs15(
    "div",
    {
      ref,
      "data-size": size,
      role: role ?? (useStatusRole ? "status" : void 0),
      className: cn(
        "flex w-full flex-col items-center justify-center rounded-xl2 border border-aivent-border bg-aivent-panel text-center text-aivent-text",
        s.root,
        className
      ),
      ...props,
      children: [
        icon ? /* @__PURE__ */ jsx29(
          "div",
          {
            "aria-hidden": "true",
            className: cn(
              "grid place-items-center rounded-full border border-aivent-border bg-white/5 text-white",
              s.iconWrap
            ),
            children: icon
          }
        ) : null,
        title ? /* @__PURE__ */ jsx29("div", { className: cn("font-semibold text-white", s.title), children: title }) : null,
        description ? /* @__PURE__ */ jsx29("div", { className: cn("max-w-[56ch] text-aivent-text/70", s.description), children: description }) : null,
        actions ? /* @__PURE__ */ jsx29("div", { className: cn("flex flex-wrap items-center justify-center gap-3", s.actions), children: actions }) : null
      ]
    }
  );
});
Empty.displayName = "Empty";

// src/components/ui/result.tsx
import * as React26 from "react";
import { jsx as jsx30, jsxs as jsxs16 } from "react/jsx-runtime";
function statusBorderClass(status) {
  switch (status) {
    case "success":
      return "border-emerald-500/60";
    case "warning":
      return "border-yellow-500/60";
    case "error":
      return "border-red-500/70";
    case "info":
    default:
      return "border-aivent-border";
  }
}
function statusIconClass(status) {
  switch (status) {
    case "success":
      return "text-emerald-400";
    case "warning":
      return "text-yellow-400";
    case "error":
      return "text-red-400";
    case "info":
    default:
      return "text-aivent-primary";
  }
}
function DefaultStatusIcon({ status }) {
  const common = "h-7 w-7";
  switch (status) {
    case "success":
      return /* @__PURE__ */ jsx30("svg", { viewBox: "0 0 24 24", className: common, fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx30(
        "path",
        {
          d: "M20 6L9 17l-5-5",
          stroke: "currentColor",
          strokeWidth: "2.25",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ) });
    case "warning":
      return /* @__PURE__ */ jsxs16("svg", { viewBox: "0 0 24 24", className: common, fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx30(
          "path",
          {
            d: "M12 9v5",
            stroke: "currentColor",
            strokeWidth: "2.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx30("path", { d: "M12 17h.01", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx30(
          "path",
          {
            d: "M10.29 3.86a2 2 0 0 1 3.42 0l8.08 14.02A2 2 0 0 1 20.08 21H3.92a2 2 0 0 1-1.71-3.12L10.29 3.86Z",
            stroke: "currentColor",
            strokeWidth: "2.25",
            strokeLinejoin: "round"
          }
        )
      ] });
    case "error":
      return /* @__PURE__ */ jsxs16("svg", { viewBox: "0 0 24 24", className: common, fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx30("path", { d: "M15 9l-6 6", stroke: "currentColor", strokeWidth: "2.25", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx30("path", { d: "M9 9l6 6", stroke: "currentColor", strokeWidth: "2.25", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx30(
          "path",
          {
            d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z",
            stroke: "currentColor",
            strokeWidth: "2.25"
          }
        )
      ] });
    case "info":
    default:
      return /* @__PURE__ */ jsxs16("svg", { viewBox: "0 0 24 24", className: common, fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx30(
          "path",
          {
            d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z",
            stroke: "currentColor",
            strokeWidth: "2.25"
          }
        ),
        /* @__PURE__ */ jsx30("path", { d: "M12 10v6", stroke: "currentColor", strokeWidth: "2.25", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx30("path", { d: "M12 7h.01", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round" })
      ] });
  }
}
var Result = React26.forwardRef(function Result2({ className, status = "info", icon, title, description, actions, role = "alert", ...props }, ref) {
  return /* @__PURE__ */ jsxs16(
    "div",
    {
      ref,
      "data-status": status,
      role,
      className: cn(
        "flex w-full flex-col items-center justify-center gap-4 rounded-xl2 border bg-aivent-panel px-8 py-10 text-center text-aivent-text",
        statusBorderClass(status),
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx30(
          "div",
          {
            "aria-hidden": "true",
            className: cn("grid h-14 w-14 place-items-center rounded-full border border-aivent-border bg-white/5", statusIconClass(status)),
            children: icon ?? /* @__PURE__ */ jsx30(DefaultStatusIcon, { status })
          }
        ),
        /* @__PURE__ */ jsxs16("div", { className: "grid gap-2", children: [
          title ? /* @__PURE__ */ jsx30("div", { className: "text-base font-semibold text-white", children: title }) : null,
          description ? /* @__PURE__ */ jsx30("div", { className: "max-w-[64ch] text-sm text-aivent-text/70", children: description }) : null
        ] }),
        actions ? /* @__PURE__ */ jsx30("div", { className: "mt-2 flex flex-wrap items-center justify-center gap-3", children: actions }) : null
      ]
    }
  );
});
Result.displayName = "Result";

// src/components/ui/skeleton.tsx
import * as React27 from "react";
import { jsx as jsx31 } from "react/jsx-runtime";
function sizeClass3(variant, size) {
  if (variant === "avatar") {
    switch (size) {
      case "small":
        return "h-8 w-8";
      case "large":
        return "h-12 w-12";
      case "middle":
      default:
        return "h-10 w-10";
    }
  }
  if (variant === "text") {
    switch (size) {
      case "small":
        return "h-3 w-full";
      case "large":
        return "h-5 w-full";
      case "middle":
      default:
        return "h-4 w-full";
    }
  }
  switch (size) {
    case "small":
      return "h-24 w-full";
    case "large":
      return "h-40 w-full";
    case "middle":
    default:
      return "h-32 w-full";
  }
}
function variantClass4(variant) {
  switch (variant) {
    case "avatar":
      return "rounded-full";
    case "text":
      return "rounded";
    case "block":
    default:
      return "rounded-md";
  }
}
var Skeleton = React27.forwardRef(
  ({ variant = "block", size = "middle", className, ...props }, ref) => {
    const { role = "status", ...rest } = props;
    const { ["aria-busy"]: ariaBusyProp, ...restProps } = rest;
    const ariaBusy = ariaBusyProp ?? true;
    return /* @__PURE__ */ jsx31(
      "div",
      {
        ref,
        role,
        "aria-busy": ariaBusy,
        "data-variant": variant,
        "data-size": size,
        className: cn(
          "animate-pulse bg-white/10",
          variantClass4(variant),
          sizeClass3(variant, size),
          className
        ),
        ...restProps
      }
    );
  }
);
Skeleton.displayName = "Skeleton";

// src/components/ui/confirm-dialog.tsx
import * as React28 from "react";
import { jsx as jsx32, jsxs as jsxs17 } from "react/jsx-runtime";
function useControllableState9({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React28.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React28.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function ConfirmDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
  contentClassName
}) {
  const [isOpen, setIsOpen] = useControllableState9({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const [isLoading, setIsLoading] = React28.useState(false);
  const close = React28.useCallback(() => setIsOpen(false), [setIsOpen]);
  const handleCancel = React28.useCallback(() => {
    if (isLoading) return;
    onCancel?.();
    close();
  }, [close, isLoading, onCancel]);
  const handleConfirm = React28.useCallback(async () => {
    if (isLoading) return;
    try {
      const result = onConfirm?.();
      if (result && typeof result.then === "function") {
        setIsLoading(true);
        await result;
        setIsLoading(false);
        close();
        return;
      }
      close();
    } catch {
      setIsLoading(false);
    }
  }, [close, isLoading, onConfirm]);
  return /* @__PURE__ */ jsxs17(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [
    trigger ? /* @__PURE__ */ jsx32(DialogTrigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs17(
      DialogContent,
      {
        className: contentClassName,
        onEscapeKeyDown: (e) => {
          if (isLoading) e.preventDefault();
        },
        onPointerDownOutside: (e) => {
          if (isLoading) e.preventDefault();
        },
        children: [
          /* @__PURE__ */ jsx32(DialogTitle, { children: title }),
          /* @__PURE__ */ jsx32(DialogDescription, { children: description }),
          children ? /* @__PURE__ */ jsx32("div", { className: "mt-4", children }) : null,
          /* @__PURE__ */ jsxs17("div", { className: "mt-6 flex justify-end gap-2", children: [
            /* @__PURE__ */ jsx32(Button, { variant: "ghost", onClick: handleCancel, disabled: isLoading, children: cancelText }),
            /* @__PURE__ */ jsxs17(
              Button,
              {
                onClick: handleConfirm,
                disabled: isLoading,
                className: cn(
                  danger ? "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500/40" : "",
                  isLoading ? "cursor-wait" : ""
                ),
                children: [
                  isLoading ? /* @__PURE__ */ jsx32(Spinner, { size: "sm", label: "Loading", className: "mr-2" }) : null,
                  confirmText
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}

// src/components/ui/form-layout.tsx
import * as React29 from "react";
import { jsx as jsx33, jsxs as jsxs18 } from "react/jsx-runtime";
var FormLayoutContext = React29.createContext(null);
function normalizeLabelWidth(v) {
  if (v === void 0) return void 0;
  if (typeof v === "number") return `${v}px`;
  return v;
}
var FormLayout = React29.forwardRef(
  ({ layout = "vertical", labelWidth = 120, className, style, ...props }, ref) => {
    const labelWidthCss = normalizeLabelWidth(labelWidth);
    const ctx = React29.useMemo(
      () => ({
        layout,
        labelWidth: labelWidthCss
      }),
      [layout, labelWidthCss]
    );
    return /* @__PURE__ */ jsx33(FormLayoutContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx33(
      "div",
      {
        ref,
        "data-form-layout": layout,
        className: cn("w-full", className),
        style: {
          ...style,
          ...labelWidthCss ? { ["--aivent-form-label-width"]: labelWidthCss } : null
        },
        ...props
      }
    ) });
  }
);
FormLayout.displayName = "FormLayout";
var FormSection = React29.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx33("section", { ref, className: cn("grid gap-4", className), ...props });
});
FormSection.displayName = "FormSection";
var FormRow = React29.forwardRef(({ className, ...props }, ref) => {
  const ctx = React29.useContext(FormLayoutContext);
  const layout = ctx?.layout ?? "vertical";
  return /* @__PURE__ */ jsx33(
    "div",
    {
      ref,
      "data-form-row": "",
      className: cn(layout === "inline" ? "flex flex-wrap items-end gap-4" : "grid gap-4", className),
      ...props
    }
  );
});
FormRow.displayName = "FormRow";
var FormCol = React29.forwardRef(
  ({
    asItem = false,
    label,
    htmlFor,
    labelClassName,
    contentClassName,
    labelWidth,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const ctx = React29.useContext(FormLayoutContext);
    const layout = ctx?.layout ?? "vertical";
    const labelWidthCss = normalizeLabelWidth(labelWidth ?? ctx?.labelWidth);
    const isHorizontal = layout === "horizontal" || layout === "inline";
    const nextChildren = React29.useMemo(() => {
      if (!asItem) return children;
      if (!React29.isValidElement(children)) return children;
      const el = children;
      return React29.cloneElement(el, {
        className: cn(el.props.className, "contents")
      });
    }, [asItem, children]);
    return /* @__PURE__ */ jsxs18(
      "div",
      {
        ref,
        "data-form-col": layout,
        className: cn(
          "min-w-0",
          layout === "vertical" ? "grid gap-2" : null,
          layout === "horizontal" ? cn(
            "grid items-start gap-x-4 gap-y-2",
            // label in col1; everything else in col2
            "[&>label]:col-start-1 [&>[data-form-col-label]]:col-start-1",
            "[&>*:not(label):not([data-form-col-label])]:col-start-2"
          ) : null,
          layout === "inline" ? cn(
            "grid items-center gap-x-3 gap-y-1",
            "[&>label]:col-start-1 [&>[data-form-col-label]]:col-start-1",
            "[&>*:not(label):not([data-form-col-label])]:col-start-2"
          ) : null,
          isHorizontal ? "grid-cols-[var(--aivent-form-label-width,_120px)_minmax(0,1fr)]" : null,
          className
        ),
        style: {
          ...style,
          ...labelWidthCss ? { ["--aivent-form-label-width"]: labelWidthCss } : null
        },
        ...props,
        children: [
          label !== void 0 ? htmlFor ? /* @__PURE__ */ jsx33(
            "label",
            {
              "data-form-col-label": "",
              htmlFor,
              className: cn(
                "text-sm font-medium leading-none text-aivent-text",
                layout === "inline" ? "whitespace-nowrap" : null,
                labelClassName
              ),
              children: label
            }
          ) : /* @__PURE__ */ jsx33(
            "div",
            {
              "data-form-col-label": "",
              className: cn(
                "text-sm font-medium leading-none text-aivent-text",
                layout === "inline" ? "whitespace-nowrap" : null,
                labelClassName
              ),
              children: label
            }
          ) : null,
          label !== void 0 && isHorizontal ? /* @__PURE__ */ jsx33("div", { "data-form-col-content": "", className: cn("min-w-0", contentClassName), children: nextChildren }) : /* @__PURE__ */ jsx33(React29.Fragment, { children: nextChildren })
        ]
      }
    );
  }
);
FormCol.displayName = "FormCol";

// src/components/form/Form.tsx
import * as React30 from "react";
import {
  FormProvider,
  Controller,
  useFormContext
} from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { jsx as jsx34 } from "react/jsx-runtime";
function Form(props) {
  return /* @__PURE__ */ jsx34(FormProvider, { ...props });
}
var FormFieldContext = React30.createContext(null);
function FormField(props) {
  return /* @__PURE__ */ jsx34(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx34(Controller, { ...props }) });
}
var FormItemContext = React30.createContext(null);
var FormItem = React30.forwardRef(
  ({ className, ...props }, ref) => {
    const id = React30.useId();
    return /* @__PURE__ */ jsx34(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx34("div", { ref, className: cn("grid gap-2", className), ...props }) });
  }
);
FormItem.displayName = "FormItem";
function useFormField() {
  const fieldCtx = React30.useContext(FormFieldContext);
  const itemCtx = React30.useContext(FormItemContext);
  if (!fieldCtx) throw new Error("useFormField must be used within <FormField>.");
  if (!itemCtx) throw new Error("useFormField must be used within <FormItem>.");
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldCtx.name, formState);
  const id = itemCtx.id;
  const formItemId = `${id}-form-item`;
  const formMessageId = `${id}-form-item-message`;
  return {
    name: fieldCtx.name,
    id,
    formItemId,
    formMessageId,
    ...fieldState
  };
}
var FormLabel = React30.forwardRef(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return /* @__PURE__ */ jsx34(
    LabelPrimitive.Root,
    {
      ref,
      ...props,
      htmlFor: formItemId,
      className: cn("text-sm font-medium leading-none text-aivent-text", className)
    }
  );
});
FormLabel.displayName = "FormLabel";
var FormControl = React30.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, id: _id, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    const { error, formItemId, formMessageId } = useFormField();
    const describedBy = [ariaDescribedBy, error ? formMessageId : null].filter(Boolean).join(" ") || void 0;
    return /* @__PURE__ */ jsx34(
      Slot,
      {
        ...props,
        ref,
        id: formItemId,
        "aria-invalid": error ? true : void 0,
        "aria-describedby": describedBy,
        className: cn(className)
      }
    );
  }
);
FormControl.displayName = "FormControl";
var FormMessage = React30.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, children, id: _id, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error?.message ? String(error.message) : children;
    if (!body) return null;
    return /* @__PURE__ */ jsx34(
      "p",
      {
        ...props,
        ref,
        id: formMessageId,
        className: cn("text-sm font-medium text-red-500/90", className),
        children: body
      }
    );
  }
);
FormMessage.displayName = "FormMessage";

// src/components/data/Table.tsx
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { jsx as jsx35, jsxs as jsxs19 } from "react/jsx-runtime";
function Table({
  data,
  columns,
  loading = false,
  emptyText = "No data",
  className
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  const headerGroups = table.getHeaderGroups();
  const rowModel = table.getRowModel();
  const visibleColumnsCount = Math.max(table.getVisibleLeafColumns().length, 1);
  return /* @__PURE__ */ jsx35("div", { className: cn("w-full overflow-x-auto", className), children: /* @__PURE__ */ jsxs19("table", { className: "w-full border-collapse text-left text-sm", children: [
    /* @__PURE__ */ jsx35("thead", { className: "border-b border-aivent-border/30", children: headerGroups.map((hg) => /* @__PURE__ */ jsx35("tr", { children: hg.headers.map((header) => /* @__PURE__ */ jsx35(
      "th",
      {
        scope: "col",
        className: "px-4 py-3 font-semibold text-white/90",
        children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
      },
      header.id
    )) }, hg.id)) }),
    /* @__PURE__ */ jsx35("tbody", { children: loading ? /* @__PURE__ */ jsx35("tr", { children: /* @__PURE__ */ jsx35("td", { colSpan: visibleColumnsCount, className: "px-4 py-6", children: /* @__PURE__ */ jsxs19("div", { className: "flex items-center gap-2 text-white/80", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ jsx35(Spinner, { size: "sm", label: "Loading" }),
      /* @__PURE__ */ jsx35("span", { children: "Loading..." })
    ] }) }) }) : rowModel.rows.length === 0 ? /* @__PURE__ */ jsx35("tr", { children: /* @__PURE__ */ jsx35("td", { colSpan: visibleColumnsCount, className: "px-4 py-6 text-white/70", children: emptyText }) }) : rowModel.rows.map((row) => /* @__PURE__ */ jsx35("tr", { className: "border-b border-aivent-border/15 last:border-b-0", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx35("td", { className: "px-4 py-3 text-white/85", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
  ] }) });
}

// src/components/data/Tree.tsx
import * as React31 from "react";
import { jsx as jsx36, jsxs as jsxs20 } from "react/jsx-runtime";
function useControllableState10(controlled, defaultValue, onChange) {
  const [uncontrolled, setUncontrolled] = React31.useState(defaultValue);
  const isControlled = controlled !== void 0;
  const value = isControlled ? controlled : uncontrolled;
  const setValue = React31.useCallback(
    (next) => {
      if (!isControlled) {
        setUncontrolled((prev) => {
          const resolved2 = typeof next === "function" ? next(prev) : next;
          onChange?.(resolved2);
          return resolved2;
        });
        return;
      }
      const resolved = typeof next === "function" ? next(controlled) : next;
      onChange?.(resolved);
    },
    [controlled, isControlled, onChange]
  );
  return [value, setValue];
}
function getNodeText(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React31.isValidElement(node)) return getNodeText(node.props?.children);
  return "";
}
function defaultFilterOption(searchValue, node) {
  const t = getNodeText(node.title).toLowerCase();
  return t.includes(searchValue.toLowerCase());
}
function updateTreeNodeChildren(nodes, key, children) {
  return nodes.map((n) => {
    if (n.key === key) return { ...n, children };
    if (!n.children) return n;
    return { ...n, children: updateTreeNodeChildren(n.children, key, children) };
  });
}
function hasChildren(node) {
  return Array.isArray(node.children) && node.children.length > 0;
}
function isExpandable(node, loadData) {
  if (node.isLeaf) return false;
  return hasChildren(node) || Boolean(loadData);
}
function Tree({
  data,
  className,
  showSearch = false,
  searchValue,
  defaultSearchValue,
  onSearchValueChange,
  filterOption,
  loadData,
  loadingKeys,
  defaultLoadingKeys,
  onLoadingKeysChange,
  expandedKeys,
  defaultExpandedKeys,
  onExpandedKeysChange,
  selectedKey,
  defaultSelectedKey,
  onSelectedKeyChange
}) {
  const [innerData, setInnerData] = React31.useState(data);
  React31.useEffect(() => setInnerData(data), [data]);
  const [mergedSearchValue, setSearchValue] = useControllableState10(
    searchValue,
    defaultSearchValue ?? "",
    onSearchValueChange
  );
  const [mergedExpandedKeys, setExpandedKeys] = useControllableState10(
    expandedKeys,
    defaultExpandedKeys ?? [],
    onExpandedKeysChange
  );
  const [mergedLoadingKeys, setLoadingKeys] = useControllableState10(
    loadingKeys,
    defaultLoadingKeys ?? [],
    onLoadingKeysChange
  );
  const [mergedSelectedKey, setSelectedKey] = useControllableState10(
    selectedKey,
    defaultSelectedKey,
    onSelectedKeyChange
  );
  const loadedKeysRef = React31.useRef(/* @__PURE__ */ new Set());
  const inFlightLoadRef = React31.useRef(/* @__PURE__ */ new Map());
  const actualFilterOption = filterOption ?? defaultFilterOption;
  const { filteredData, autoExpandKeys } = React31.useMemo(() => {
    const sv = mergedSearchValue.trim();
    if (!sv) return { filteredData: innerData, autoExpandKeys: /* @__PURE__ */ new Set() };
    const auto = /* @__PURE__ */ new Set();
    function loop(nodes) {
      const res = [];
      for (const n of nodes) {
        const match = actualFilterOption(sv, n);
        const nextChildren = n.children ? loop(n.children) : void 0;
        if (match) {
          res.push({ ...n, children: nextChildren ?? n.children });
          continue;
        }
        if (nextChildren && nextChildren.length > 0) {
          auto.add(n.key);
          res.push({ ...n, children: nextChildren });
        }
      }
      return res;
    }
    return { filteredData: loop(innerData), autoExpandKeys: auto };
  }, [actualFilterOption, innerData, mergedSearchValue]);
  const expandedKeySet = React31.useMemo(() => new Set(mergedExpandedKeys), [mergedExpandedKeys]);
  const effectiveExpandedKeySet = React31.useMemo(() => {
    if (!mergedSearchValue.trim()) return expandedKeySet;
    const next = new Set(expandedKeySet);
    for (const k of autoExpandKeys) next.add(k);
    return next;
  }, [autoExpandKeys, expandedKeySet, mergedSearchValue]);
  const loadingKeySet = React31.useMemo(() => new Set(mergedLoadingKeys), [mergedLoadingKeys]);
  const flat = React31.useMemo(() => {
    const out = [];
    function walk(nodes, level, parentKey) {
      for (const n of nodes) {
        out.push({ key: n.key, node: n, level, parentKey });
        const expanded = effectiveExpandedKeySet.has(n.key);
        if (expanded && n.children && n.children.length > 0) {
          walk(n.children, level + 1, n.key);
        }
      }
    }
    walk(filteredData, 1, void 0);
    return out;
  }, [effectiveExpandedKeySet, filteredData]);
  const nodeByKey = React31.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const f of flat) m.set(f.key, f);
    return m;
  }, [flat]);
  const itemRefs = React31.useRef(/* @__PURE__ */ new Map());
  const [activeKey, setActiveKey] = React31.useState(flat[0]?.key);
  React31.useEffect(() => {
    if (activeKey && nodeByKey.has(activeKey)) return;
    setActiveKey(flat[0]?.key);
  }, [activeKey, flat, nodeByKey]);
  const focusKey = React31.useCallback(
    (key) => {
      setActiveKey(key);
      queueMicrotask(() => {
        itemRefs.current.get(key)?.focus();
      });
    },
    [setActiveKey]
  );
  const toggleExpand = React31.useCallback(
    async (key, nextExpanded) => {
      const f = nodeByKey.get(key);
      if (!f) return;
      const expandable = isExpandable(f.node, loadData);
      if (!expandable) return;
      const expandedNow = expandedKeySet.has(key);
      const shouldExpand = nextExpanded ?? !expandedNow;
      const nextKeys = shouldExpand ? Array.from(/* @__PURE__ */ new Set([...mergedExpandedKeys, key])) : mergedExpandedKeys.filter((k) => k !== key);
      setExpandedKeys(nextKeys);
      if (!shouldExpand) return;
      if (!loadData) return;
      if (f.node.isLeaf) return;
      if (hasChildren(f.node)) return;
      if (loadedKeysRef.current.has(key)) return;
      if (inFlightLoadRef.current.has(key)) return;
      const nextLoading = Array.from(/* @__PURE__ */ new Set([...mergedLoadingKeys, key]));
      setLoadingKeys(nextLoading);
      const p = (async () => {
        try {
          const result = await loadData(f.node);
          loadedKeysRef.current.add(key);
          if (Array.isArray(result)) {
            setInnerData((prev) => updateTreeNodeChildren(prev, key, result));
          }
        } finally {
          inFlightLoadRef.current.delete(key);
          setLoadingKeys((prev) => prev.filter((k) => k !== key));
        }
      })();
      inFlightLoadRef.current.set(key, p);
    },
    [
      expandedKeySet,
      loadData,
      mergedExpandedKeys,
      mergedLoadingKeys,
      nodeByKey,
      setExpandedKeys,
      setLoadingKeys
    ]
  );
  const onItemKeyDown = React31.useCallback(
    async (e, key) => {
      const idx = flat.findIndex((f2) => f2.key === key);
      if (idx < 0) return;
      const f = flat[idx];
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next = flat[idx + 1];
          if (next) focusKey(next.key);
          return;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev = flat[idx - 1];
          if (prev) focusKey(prev.key);
          return;
        }
        case "ArrowRight": {
          e.preventDefault();
          if (!isExpandable(f.node, loadData)) return;
          const expanded = effectiveExpandedKeySet.has(key);
          if (!expanded) {
            await toggleExpand(key, true);
            return;
          }
          const child = flat[idx + 1];
          if (child && child.parentKey === key) focusKey(child.key);
          return;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const expanded = effectiveExpandedKeySet.has(key);
          if (expanded && isExpandable(f.node, loadData)) {
            await toggleExpand(key, false);
            return;
          }
          if (f.parentKey) focusKey(f.parentKey);
          return;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (isExpandable(f.node, loadData)) {
            await toggleExpand(key);
          } else {
            setSelectedKey(key);
          }
          return;
        }
      }
    },
    [effectiveExpandedKeySet, flat, focusKey, loadData, setSelectedKey, toggleExpand]
  );
  return /* @__PURE__ */ jsxs20("div", { className: cn("grid gap-2", className), children: [
    showSearch ? /* @__PURE__ */ jsx36(
      Input,
      {
        "aria-label": "tree search",
        placeholder: "Search",
        value: mergedSearchValue,
        onChange: (e) => setSearchValue(e.target.value)
      }
    ) : null,
    /* @__PURE__ */ jsx36("div", { role: "tree", "aria-label": "tree", className: "grid gap-1", children: flat.length === 0 ? /* @__PURE__ */ jsx36("div", { className: "text-sm text-aivent-muted", children: "No data" }) : flat.map(({ key, node, level }) => {
      const expanded = effectiveExpandedKeySet.has(key);
      const expandable = isExpandable(node, loadData);
      const selected = mergedSelectedKey === key;
      const loading = loadingKeySet.has(key);
      const labelText = getNodeText(node.title);
      return /* @__PURE__ */ jsxs20(
        "div",
        {
          ref: (el) => {
            itemRefs.current.set(key, el);
          },
          role: "treeitem",
          "aria-label": labelText || void 0,
          "aria-level": level,
          "aria-expanded": expandable ? expanded : void 0,
          "aria-selected": selected,
          tabIndex: activeKey === key ? 0 : -1,
          "data-tree-key": key,
          onFocus: () => setActiveKey(key),
          onKeyDown: (e) => onItemKeyDown(e, key),
          onClick: () => {
            if (node.disabled) return;
            focusKey(key);
            setSelectedKey(key);
          },
          className: cn(
            "flex items-center gap-2 rounded-md px-2 py-1 text-sm outline-none",
            "focus-visible:ring-2 focus-visible:ring-banli-primary/60",
            node.disabled ? "cursor-not-allowed opacity-60" : "cursor-default",
            selected ? "bg-aivent-primary/10" : "hover:bg-aivent-primary/5"
          ),
          style: { paddingLeft: (level - 1) * 16 + 8 },
          children: [
            expandable ? /* @__PURE__ */ jsx36(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": expanded ? "Collapse" : "Expand",
                disabled: node.disabled,
                onClick: async (e) => {
                  e.stopPropagation();
                  await toggleExpand(key);
                },
                className: cn(
                  "inline-flex h-5 w-5 items-center justify-center rounded text-aivent-muted hover:bg-aivent-primary/10"
                ),
                children: loading ? /* @__PURE__ */ jsx36(Spinner, { size: "sm", variant: "muted", label: "Loading children" }) : /* @__PURE__ */ jsx36("span", { "aria-hidden": "true", children: expanded ? "\u25BE" : "\u25B8" })
              }
            ) : /* @__PURE__ */ jsx36(
              "span",
              {
                "aria-hidden": "true",
                className: "inline-flex h-5 w-5 items-center justify-center opacity-0",
                children: "\u25B8"
              }
            ),
            /* @__PURE__ */ jsx36("span", { className: "min-w-0 flex-1 truncate", children: node.title })
          ]
        },
        key
      );
    }) })
  ] });
}

// src/components/data/Cascader.tsx
import * as React32 from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx37, jsxs as jsxs21 } from "react/jsx-runtime";
function useControllableState11({
  value,
  defaultValue,
  onChange
}) {
  const [uncontrolled, setUncontrolled] = React32.useState(defaultValue);
  const isControlled = value !== void 0;
  const state = isControlled ? value : uncontrolled;
  const setState = React32.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}
function defaultFilterOption2(inputValue, path) {
  const needle = inputValue.trim().toLowerCase();
  if (!needle) return true;
  const text = path.map((o) => {
    const v = o.label;
    if (typeof v === "string") return v;
    if (typeof v === "number") return String(v);
    return o.value;
  }).join(" / ").toLowerCase();
  return text.includes(needle);
}
function getFirstEnabled(list) {
  return list.find((o) => !o.disabled);
}
function findPathByValues(options, values) {
  const path = [];
  let current = options;
  for (const v of values) {
    const hit = current.find((o) => o.value === v);
    if (!hit) break;
    path.push(hit);
    current = hit.children ?? [];
  }
  return path;
}
function getColumns(options, activeValues) {
  const columns = [options];
  let current = options;
  for (let depth = 0; depth < activeValues.length; depth++) {
    const v = activeValues[depth];
    const hit = current.find((o) => o.value === v);
    if (!hit) break;
    if (hit.children && hit.children.length > 0) {
      columns.push(hit.children);
      current = hit.children;
    } else {
      break;
    }
  }
  return columns;
}
function pathToText(path) {
  return path.map((o) => {
    const v = o.label;
    if (typeof v === "string" || typeof v === "number") return String(v);
    return o.value;
  }).join(" / ");
}
function buildSearchHits(options, filter, inputValue) {
  const hits = [];
  const walk = (list, prefix) => {
    for (const opt of list) {
      const next = [...prefix, opt];
      if (filter(inputValue, next)) {
        hits.push({
          values: next.map((o) => o.value),
          path: next,
          text: pathToText(next)
        });
      }
      if (opt.children && opt.children.length) walk(opt.children, next);
    }
  };
  walk(options, []);
  return hits;
}
function Cascader({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "\u8BF7\u9009\u62E9",
  disabled = false,
  showSearch = false,
  searchValue,
  defaultSearchValue,
  onSearchValueChange,
  filterOption = defaultFilterOption2,
  loadData,
  className,
  ...props
}) {
  const isValueControlled = value !== void 0;
  const [uncontrolledValue, setUncontrolledValue] = React32.useState(defaultValue ?? []);
  const selectedValue = isValueControlled ? value : uncontrolledValue;
  const [open, setOpen] = React32.useState(false);
  const [optionsTick, setOptionsTick] = React32.useState(0);
  const [internalOptions, setInternalOptions] = React32.useState(options);
  const [sv, setSv] = useControllableState11({
    value: searchValue,
    defaultValue: defaultSearchValue ?? "",
    onChange: onSearchValueChange
  });
  const [searchActiveIndex, setSearchActiveIndex] = React32.useState(0);
  const triggerRef = React32.useRef(null);
  const contentRef = React32.useRef(null);
  const searchInputRef = React32.useRef(null);
  const [activeValues, setActiveValues] = React32.useState([]);
  const [focusDepth, setFocusDepth] = React32.useState(0);
  React32.useEffect(() => {
    setInternalOptions(options);
  }, [options]);
  React32.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const t = e.target;
      if (triggerRef.current?.contains(t)) return;
      if (contentRef.current?.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);
  const selectedPath = React32.useMemo(() => {
    void optionsTick;
    return findPathByValues(internalOptions, selectedValue);
  }, [internalOptions, optionsTick, selectedValue]);
  const triggerText = selectedPath.length ? pathToText(selectedPath) : null;
  const columns = React32.useMemo(() => {
    void optionsTick;
    return getColumns(internalOptions, activeValues);
  }, [activeValues, internalOptions, optionsTick]);
  const isSearching = showSearch && sv.trim().length > 0;
  const searchHits = React32.useMemo(() => isSearching ? buildSearchHits(internalOptions, filterOption, sv) : [], [filterOption, internalOptions, isSearching, sv]);
  React32.useEffect(() => {
    if (!isSearching) return;
    setSearchActiveIndex(0);
  }, [isSearching, sv]);
  const commitSelect = React32.useCallback(
    (next) => {
      if (!isValueControlled) setUncontrolledValue(next.values);
      onChange?.(next.values, next.path);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [isValueControlled, onChange]
  );
  const focusOption = React32.useCallback((depth, v) => {
    const root = contentRef.current;
    if (!root) return;
    const selector = v ? `[data-cascader-option="true"][data-depth="${depth}"][data-value="${CSS.escape(v)}"]` : `[data-cascader-option="true"][data-depth="${depth}"]:not([data-disabled="true"])`;
    const el = root.querySelector(selector);
    el?.focus();
  }, []);
  React32.useEffect(() => {
    if (!open) return;
    setFocusDepth(0);
    setActiveValues((prev) => {
      if (prev.length) return prev;
      if (selectedValue.length) return selectedValue;
      const first = getFirstEnabled(internalOptions);
      return first ? [first.value] : [];
    });
    queueMicrotask(() => {
      if (showSearch) {
        searchInputRef.current?.focus();
        return;
      }
      const first = selectedValue.length ? selectedValue[0] : getFirstEnabled(internalOptions)?.value;
      focusOption(0, first);
    });
  }, [focusOption, internalOptions, open, selectedValue, showSearch]);
  const ensureNextColumnLoaded = React32.useCallback(
    async (path) => {
      if (!loadData) return;
      const last = path[path.length - 1];
      if (!last) return;
      const hasChildren2 = !!last.children?.length;
      const canLoad = !hasChildren2 && last.isLeaf !== true;
      if (!canLoad) return;
      last.loading = true;
      setOptionsTick((t) => t + 1);
      try {
        await loadData(path);
      } finally {
        last.loading = false;
        setInternalOptions((prev) => [...prev]);
        setOptionsTick((t) => t + 1);
      }
    },
    [loadData]
  );
  const activateAtDepth = React32.useCallback(
    async (depth, opt, { focusNext }) => {
      if (opt.disabled) return;
      setActiveValues((prev) => {
        const next = prev.slice(0, depth);
        next[depth] = opt.value;
        return next;
      });
      const nextActiveValues = (() => {
        const base = activeValues.slice(0, depth);
        base[depth] = opt.value;
        return base;
      })();
      const path = findPathByValues(internalOptions, nextActiveValues);
      const hasChildren2 = !!opt.children?.length;
      const canLoad = !!loadData && !hasChildren2 && opt.isLeaf !== true;
      const isLeaf = opt.isLeaf === true || !hasChildren2 && !canLoad;
      if (isLeaf) {
        commitSelect({ values: path.map((o) => o.value), path });
        return;
      }
      if (canLoad) await ensureNextColumnLoaded(path);
      const last = path[path.length - 1];
      const children = last?.children ?? [];
      const firstChild = getFirstEnabled(children);
      if (firstChild) {
        setActiveValues((prev) => {
          const next = prev.slice(0, depth + 1);
          next[depth] = opt.value;
          next[depth + 1] = firstChild.value;
          return next;
        });
        if (focusNext) {
          setFocusDepth(depth + 1);
          queueMicrotask(() => focusOption(depth + 1, firstChild.value));
        }
      }
    },
    [activeValues, commitSelect, ensureNextColumnLoaded, focusOption, internalOptions, loadData]
  );
  const onPopupKeyDown = React32.useCallback(
    async (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (isSearching) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSearchActiveIndex((i) => Math.min(searchHits.length - 1, i + 1));
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSearchActiveIndex((i) => Math.max(0, i - 1));
          return;
        }
        if (e.key === "Enter") {
          const hit = searchHits[searchActiveIndex];
          if (hit) {
            e.preventDefault();
            commitSelect({ values: hit.values, path: hit.path });
          }
          return;
        }
        return;
      }
      const depth = Math.max(0, Math.min(focusDepth, columns.length - 1));
      const list = columns[depth] ?? [];
      if (!list.length) return;
      const currentValue = activeValues[depth] ?? getFirstEnabled(list)?.value;
      let idx = currentValue ? list.findIndex((o) => o.value === currentValue) : -1;
      if (idx < 0) idx = list.findIndex((o) => !o.disabled);
      const current = list[idx];
      if (!current) return;
      const nextEnabledIndex = (start, dir) => {
        let i = start;
        while (true) {
          i += dir;
          if (i < 0 || i >= list.length) return start;
          if (!list[i].disabled) return i;
        }
      };
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = nextEnabledIndex(idx, 1);
        const next = list[nextIdx];
        if (next) {
          setActiveValues((prev) => {
            const v = prev.slice(0, depth);
            v[depth] = next.value;
            return v;
          });
          queueMicrotask(() => focusOption(depth, next.value));
        }
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextIdx = nextEnabledIndex(idx, -1);
        const next = list[nextIdx];
        if (next) {
          setActiveValues((prev) => {
            const v = prev.slice(0, depth);
            v[depth] = next.value;
            return v;
          });
          queueMicrotask(() => focusOption(depth, next.value));
        }
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (depth > 0) {
          setFocusDepth(depth - 1);
          setActiveValues((prev) => prev.slice(0, depth));
          queueMicrotask(() => focusOption(depth - 1, activeValues[depth - 1]));
        }
        return;
      }
      if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        await activateAtDepth(depth, current, { focusNext: true });
        return;
      }
    },
    [activateAtDepth, activeValues, columns, commitSelect, focusDepth, focusOption, isSearching, searchActiveIndex, searchHits]
  );
  const popup = open ? /* @__PURE__ */ jsxs21(
    "div",
    {
      ref: contentRef,
      className: cn(
        "z-50 mt-2 min-w-72 overflow-hidden rounded-xl2 border border-aivent-border bg-aivent-panel text-sm text-aivent-text shadow-glow outline-none",
        "focus-visible:ring-2 focus-visible:ring-white/20"
      ),
      onKeyDown: onPopupKeyDown,
      children: [
        showSearch ? /* @__PURE__ */ jsx37("div", { className: "border-b border-aivent-border p-2", children: /* @__PURE__ */ jsx37(
          "input",
          {
            ref: searchInputRef,
            value: sv,
            onChange: (e) => setSv(e.target.value),
            className: cn(
              "h-9 w-full rounded-lg border border-aivent-border bg-transparent px-3 text-sm outline-none",
              "focus-visible:ring-2 focus-visible:ring-white/20"
            ),
            placeholder: "\u641C\u7D22",
            "aria-label": "\u641C\u7D22",
            onKeyDown: onPopupKeyDown
          }
        ) }) : null,
        isSearching ? /* @__PURE__ */ jsx37("div", { role: "listbox", "aria-label": "Cascader search results", className: "max-h-72 overflow-auto p-1", children: searchHits.length ? searchHits.map((hit, i) => /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": i === searchActiveIndex,
            tabIndex: -1,
            className: cn(
              "flex w-full cursor-default select-none items-center rounded-lg px-3 py-2 text-left outline-none transition",
              i === searchActiveIndex ? "bg-white/10 text-white" : "hover:bg-white/5"
            ),
            onMouseEnter: () => setSearchActiveIndex(i),
            onClick: () => commitSelect({ values: hit.values, path: hit.path }),
            children: /* @__PURE__ */ jsx37("span", { className: "truncate", children: hit.text })
          },
          hit.values.join(">")
        )) : /* @__PURE__ */ jsx37("div", { className: "px-3 py-2 text-aivent-muted", children: "\u65E0\u5339\u914D\u9879" }) }) : /* @__PURE__ */ jsx37("div", { className: "flex max-h-72 min-w-72 overflow-auto", children: columns.map((col, depth) => /* @__PURE__ */ jsx37(
          "div",
          {
            role: "listbox",
            "aria-label": `Cascader column ${depth + 1}`,
            className: cn("min-w-44 border-r border-aivent-border p-1 last:border-r-0"),
            children: col.map((opt) => {
              const selected = activeValues[depth] === opt.value;
              const hasChildren2 = !!opt.children?.length;
              const canLoad = !!loadData && !hasChildren2 && opt.isLeaf !== true;
              const hasNext = hasChildren2 || canLoad;
              return /* @__PURE__ */ jsxs21(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": selected,
                  "aria-disabled": opt.disabled || void 0,
                  tabIndex: -1,
                  "data-cascader-option": "true",
                  "data-depth": depth,
                  "data-value": opt.value,
                  "data-disabled": opt.disabled ? "true" : "false",
                  disabled: opt.disabled,
                  className: cn(
                    "flex w-full cursor-default select-none items-center justify-between gap-3 rounded-lg px-3 py-2 text-left outline-none transition",
                    selected ? "bg-white/10 text-white" : "hover:bg-white/5",
                    opt.disabled ? "opacity-40" : ""
                  ),
                  onMouseEnter: () => {
                    if (opt.disabled) return;
                    setActiveValues((prev) => {
                      const next = prev.slice(0, depth);
                      next[depth] = opt.value;
                      return next;
                    });
                  },
                  onClick: async () => {
                    await activateAtDepth(depth, opt, { focusNext: true });
                  },
                  children: [
                    /* @__PURE__ */ jsx37("span", { className: "truncate", children: opt.label }),
                    opt.loading ? /* @__PURE__ */ jsx37("span", { "aria-hidden": "true", className: "ml-2 text-white/70", children: "\u2026" }) : hasNext ? /* @__PURE__ */ jsx37("span", { "aria-hidden": "true", className: "ml-2 text-white/60", children: "\u25B8" }) : null
                  ]
                },
                opt.value
              );
            })
          },
          depth
        )) })
      ]
    }
  ) : null;
  return /* @__PURE__ */ jsxs21("div", { className: cn("inline-flex", className), ...props, children: [
    /* @__PURE__ */ jsxs21(
      "button",
      {
        ref: triggerRef,
        type: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-disabled": disabled || void 0,
        disabled,
        className: cn(
          "inline-flex min-w-44 items-center justify-between gap-3 rounded-lg border border-aivent-border bg-aivent-panel px-3.5 py-2 text-sm text-aivent-text outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          disabled ? "opacity-50" : "hover:bg-white/5"
        ),
        onClick: () => {
          if (disabled) return;
          setOpen((prev) => {
            const next = !prev;
            if (next) setActiveValues([]);
            return next;
          });
        },
        onKeyDown: (e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        },
        children: [
          /* @__PURE__ */ jsx37("span", { className: cn("truncate text-left", triggerText ? "text-aivent-text" : "text-aivent-muted"), children: triggerText ?? placeholder }),
          /* @__PURE__ */ jsx37("span", { "aria-hidden": "true", className: "text-white/60", children: "\u25BE" })
        ]
      }
    ),
    open ? createPortal2(popup, document.body) : null
  ] });
}

// src/lib/variants.ts
function createVariants(base, variants, defaultVariants) {
  return function variantsClassName(props = {}) {
    const parts = [base];
    for (const key of Object.keys(variants)) {
      const value = props[key] ?? defaultVariants?.[key];
      if (!value) continue;
      parts.push(variants[key][value]);
    }
    parts.push(props.className);
    return cn(parts);
  };
}
export {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  CheckboxIndicator,
  CheckboxRoot,
  Collapse,
  CollapseContent,
  CollapseItem,
  CollapseRoot,
  CollapseTrigger,
  ConfirmDialog,
  DatePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Divider,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
  Empty,
  Form,
  FormCol,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormLayout,
  FormMessage,
  FormRow,
  FormSection,
  Icon,
  IconSprite,
  Input,
  Pagination,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  RadioGroup2 as RadioGroup,
  RadioGroupItem,
  RadioGroupRoot,
  Result,
  Select,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Space,
  Spinner,
  Switch,
  SwitchRoot,
  SwitchThumb,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
  Textarea,
  Title,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tree,
  Typography,
  Upload,
  cn,
  createVariants
};
//# sourceMappingURL=index.js.map