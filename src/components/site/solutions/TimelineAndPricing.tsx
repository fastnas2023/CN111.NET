import React from "react";

import { V1Section } from "@/components/site/v1/V1Section";
import styles from "./solutions.module.scss";

export function TimelineAndPricing(props: {
  title?: string;
  timeline: Array<{ phase: string; duration: string; output: string }>;
  pricing: Array<{ tier: string; price: string; notes: string }>;
}) {
  return (
    <V1Section title={props.title ?? "周期与报价（Timeline & Pricing）"}>
      <div className={styles.grid2}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>参考周期</h3>
          <div className={styles.steps}>
            {props.timeline.map((t) => (
              <div key={t.phase}>
                <p className={styles.cardBody}>
                  <strong>{t.phase}</strong>（{t.duration}） — {t.output}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>参考报价</h3>
          <div className={styles.steps}>
            {props.pricing.map((p) => (
              <div key={p.tier}>
                <p className={styles.cardBody}>
                  <strong>{p.tier}</strong>：{p.price}
                </p>
                <p className={styles.cardBody}>{p.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </V1Section>
  );
}

