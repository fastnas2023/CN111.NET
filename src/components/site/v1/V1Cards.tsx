import type { ReactNode } from "react";
import Link from "next/link";

import styles from "./V1Cards.module.scss";

export function V1Card(props: {
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
}) {
  const Inner = (
    <>
      <h3 className={styles.cardTitle}>{props.title}</h3>
      <p className={styles.cardBody}>{props.body}</p>
      {props.href && props.ctaLabel ? (
        <span className={styles.cardCta}>{props.ctaLabel}</span>
      ) : null}
    </>
  );

  return props.href ? (
    <Link className={styles.card} href={props.href}>
      {Inner}
    </Link>
  ) : (
    <div className={styles.card}>{Inner}</div>
  );
}

export function V1Grid(props: { children: ReactNode }) {
  return <div className={styles.grid3}>{props.children}</div>;
}

export function V1Grid2(props: { children: ReactNode }) {
  return <div className={styles.grid2}>{props.children}</div>;
}
