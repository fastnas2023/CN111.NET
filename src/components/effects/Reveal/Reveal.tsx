"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "../useReducedMotion";

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

export type RevealProps = Omit<
  MotionDivProps,
  "initial" | "whileInView" | "transition" | "viewport"
> & {
  /**
   * 延迟（秒），用于错峰进入。
   */
  delay?: number;
  /**
   * 动画时长（秒）。
   */
  duration?: number;
  /**
   * 进入时的位移（px），默认为 16。
   */
  y?: number;
  /**
   * 是否只触发一次。默认 true。
   */
  once?: boolean;
  /**
   * viewport amount，默认 0.25。
   */
  amount?: number;
  /**
   * viewport margin（rootMargin），例如 "0px 0px -10% 0px"。
   */
  margin?: string;
};

/**
 * 基础“进入视口即显现”动效封装。
 * 设计目标：提供稳定的默认值 + 可扩展 props，且在 reduce-motion 时自动降级。
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 16,
  once = true,
  amount = 0.25,
  margin,
  ...rest
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      {...rest}
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration, delay, ease: [0.2, 0.8, 0.2, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

