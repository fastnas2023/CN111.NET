import { V1Section } from "../V1Section";
import styles from "./V1HomeSections.module.scss";

export type FAQAccordionProps = {
  t: (key: string) => string;
};

export function FAQAccordion({ t }: FAQAccordionProps) {
  const items = [
    { q: t("v1.home.faq.q1"), a: t("v1.home.faq.a1") },
    { q: t("v1.home.faq.q2"), a: t("v1.home.faq.a2") },
    { q: t("v1.home.faq.q3"), a: t("v1.home.faq.a3") },
    { q: t("v1.home.faq.q4"), a: t("v1.home.faq.a4") },
  ];

  return (
    <V1Section title={t("v1.home.faq.title")}>
      <div className={styles.faq}>
        {items.map((it) => (
          <details key={it.q} className={styles.faqItem}>
            <summary>{it.q}</summary>
            <p className={styles.faqAnswer}>{it.a}</p>
          </details>
        ))}
      </div>
    </V1Section>
  );
}

