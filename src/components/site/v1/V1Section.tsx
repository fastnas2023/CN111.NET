import type { ReactNode } from "react";

import styles from "./V1Section.module.scss";

export function V1Section(props: { title?: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {props.title ? <h2 className={styles.title}>{props.title}</h2> : null}
        {props.children}
      </div>
    </section>
  );
}

