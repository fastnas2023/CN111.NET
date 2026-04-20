import React from "react";

import { V1Section } from "@/components/site/v1/V1Section";
import styles from "./solutions.module.scss";

export function FAQ(props: { title?: string; items: Array<{ q: string; a: string }> }) {
  return (
    <V1Section title={props.title ?? "常见问题（FAQ）"}>
      <div className={styles.faq}>
        {props.items.map((item) => (
          <details key={item.q} className={styles.faqItem}>
            <summary className={styles.faqQ}>{item.q}</summary>
            <p className={styles.faqA}>{item.a}</p>
          </details>
        ))}
      </div>
    </V1Section>
  );
}

