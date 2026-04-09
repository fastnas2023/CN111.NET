"use client";

import React, { useEffect, useMemo, useState } from "react";

export type CountdownProps = {
  /** 目标时间（推荐传 ISO 字符串，避免时区歧义） */
  target: string | number | Date;
  className?: string;
  labels?: Partial<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>;
};

type Parts = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function toTimestamp(target: CountdownProps["target"]) {
  if (target instanceof Date) return target.getTime();
  if (typeof target === "number") return target;
  return new Date(target).getTime();
}

function getParts(targetTs: number): Parts {
  const totalMs = Math.max(0, targetTs - Date.now());
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { totalMs, days, hours, minutes, seconds };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown({
  target,
  className,
  labels,
}: CountdownProps) {
  const targetTs = useMemo(() => toTimestamp(target), [target]);
  const [parts, setParts] = useState<Parts>(() => getParts(targetTs));

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(getParts(targetTs));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetTs]);

  const text = `${parts.days}${labels?.days ?? "天"} ${pad2(parts.hours)}${
    labels?.hours ?? "时"
  } ${pad2(parts.minutes)}${labels?.minutes ?? "分"} ${pad2(parts.seconds)}${
    labels?.seconds ?? "秒"
  }`;

  return (
    <div className={className} role="timer" aria-label={text} data-countdown>
      <div data-segment>
        <div data-value>{parts.days}</div>
        <div data-label>{labels?.days ?? "天"}</div>
      </div>
      <div data-segment>
        <div data-value>{pad2(parts.hours)}</div>
        <div data-label>{labels?.hours ?? "时"}</div>
      </div>
      <div data-segment>
        <div data-value>{pad2(parts.minutes)}</div>
        <div data-label>{labels?.minutes ?? "分"}</div>
      </div>
      <div data-segment>
        <div data-value>{pad2(parts.seconds)}</div>
        <div data-label>{labels?.seconds ?? "秒"}</div>
      </div>
    </div>
  );
}
