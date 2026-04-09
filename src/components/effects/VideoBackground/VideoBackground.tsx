import React from "react";
import styles from "./VideoBackground.module.scss";

export type VideoBackgroundProps = {
  /** mp4/webm 路径（建议放 public/ 下，以 /xxx.mp4 引用） */
  src?: string;
  poster?: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  /** 默认 true */
  autoPlay?: boolean;
  /** 默认 true */
  loop?: boolean;
  /** 默认 true */
  muted?: boolean;
  /** 默认 true */
  playsInline?: boolean;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function VideoBackground({
  src,
  poster,
  className,
  children,
  overlay = true,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: VideoBackgroundProps) {
  return (
    <div className={cx(styles.root, className)}>
      {src ? (
        <video
          className={styles.video}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          poster={poster}
        >
          <source src={src} />
        </video>
      ) : (
        <div className={styles.fallback} aria-hidden="true" />
      )}

      {overlay ? <div className={styles.overlay} aria-hidden="true" /> : null}

      <div className={styles.content}>{children}</div>
    </div>
  );
}

