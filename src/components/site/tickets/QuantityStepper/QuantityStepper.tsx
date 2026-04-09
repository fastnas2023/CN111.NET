"use client";

import React from "react";
import styles from "./QuantityStepper.module.scss";

function clamp(n: number, min: number, max?: number) {
  if (n < min) return min;
  if (typeof max === "number" && n > max) return max;
  return n;
}

export type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md";
  ariaLabel?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max,
  disabled = false,
  size = "md",
  ariaLabel = "数量选择器",
}: QuantityStepperProps) {
  const decDisabled = disabled || value <= min;
  const incDisabled = disabled || (typeof max === "number" ? value >= max : false);

  return (
    <div
      className={[styles.root, styles[`size_${size}`]].join(" ")}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={styles.btn}
        onClick={() => onChange(clamp(value - 1, min, max))}
        disabled={decDisabled}
        aria-label="减少"
      >
        −
      </button>
      <div className={styles.value} aria-live="polite">
        {value}
      </div>
      <button
        type="button"
        className={styles.btn}
        onClick={() => onChange(clamp(value + 1, min, max))}
        disabled={incDisabled}
        aria-label="增加"
      >
        +
      </button>
    </div>
  );
}

