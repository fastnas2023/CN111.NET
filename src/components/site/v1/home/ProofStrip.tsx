import { V1Section } from "../V1Section";
import styles from "./V1HomeSections.module.scss";

export type ProofStripProps = {
  t: (key: string) => string;
};

export function ProofStrip({ t }: ProofStripProps) {
  const items = [
    { value: t("v1.home.proof.1.value"), label: t("v1.home.proof.1.label") },
    { value: t("v1.home.proof.2.value"), label: t("v1.home.proof.2.label") },
    { value: t("v1.home.proof.3.value"), label: t("v1.home.proof.3.label") },
  ];

  return (
    <V1Section>
      <div className={styles.proofStrip}>
        {items.map((it) => (
          <div key={it.value} className={styles.proofItem}>
            <p className={styles.proofValue}>{it.value}</p>
            <p className={styles.proofLabel}>{it.label}</p>
          </div>
        ))}
      </div>
    </V1Section>
  );
}

