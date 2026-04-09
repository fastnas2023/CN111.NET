"use client";

import React from "react";
import ReactFastMarquee from "react-fast-marquee";
import styles from "./Marquee.module.scss";

export type MarqueeProps = {
  className?: string;
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  autoFill?: boolean;
  pauseOnHover?: boolean;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * 跑马灯封装（基于 react-fast-marquee），便于统一样式与复用。
 */
export function Marquee({
  className,
  children,
  direction = "left",
  speed = 42,
  autoFill = true,
  pauseOnHover = false,
}: MarqueeProps) {
  return (
    <ReactFastMarquee
      className={cx(styles.root, className)}
      direction={direction}
      speed={speed}
      autoFill={autoFill}
      pauseOnHover={pauseOnHover}
      gradient={false}
    >
      <div className={styles.track}>{children}</div>
    </ReactFastMarquee>
  );
}

