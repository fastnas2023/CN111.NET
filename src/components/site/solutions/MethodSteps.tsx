import React from "react";

import { V1Section } from "@/components/site/v1/V1Section";
import styles from "./solutions.module.scss";

export function MethodSteps(props: {
  title?: string;
  steps: Array<{ title: string; body: string }>;
}) {
  return (
    <V1Section title={props.title ?? "方法（Method Steps）"}>
      <div className={styles.steps}>
        {props.steps.map((step, idx) => (
          <div key={step.title} className={styles.step}>
            <div className={styles.stepIndex} aria-hidden="true">
              {idx + 1}
            </div>
            <div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </V1Section>
  );
}

