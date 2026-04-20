import React from "react";

import { V1Section } from "@/components/site/v1/V1Section";
import styles from "./solutions.module.scss";

export function PainPoints(props: { title?: string; items: Array<{ title: string; body: string }> }) {
  return (
    <V1Section title={props.title ?? "痛点（Pain Points）"}>
      <div className={styles.grid2}>
        {props.items.map((item) => (
          <div key={item.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardBody}>{item.body}</p>
          </div>
        ))}
      </div>
    </V1Section>
  );
}

