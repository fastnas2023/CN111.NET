"use client";

import React from "react";

import { SmoothAnchor } from "@/components/effects/SmoothAnchor/SmoothAnchor";
import { SERVICES_CATEGORIES } from "./servicesData";
import styles from "./V1ServicesPricing.module.scss";

export function V1ServicesPricing(props: { anchorOffset?: number }) {
  const anchorOffset = props.anchorOffset ?? 100;

  return (
    <div className={styles.pricing}>
      <nav className={styles.anchorNav} aria-label="服务分类导航">
        <span className={styles.anchorLabel}>快速跳转</span>
        {SERVICES_CATEGORIES.map((c) => (
          <SmoothAnchor
            key={c.id}
            href={`#${c.id}`}
            offset={anchorOffset}
            className={styles.anchorLink}
          >
            {c.label}
          </SmoothAnchor>
        ))}
      </nav>

      {SERVICES_CATEGORIES.map((c) => (
        <section key={c.id} id={c.id} className={styles.category} aria-labelledby={`${c.id}-title`}>
          <header className={styles.categoryHeader}>
            <h3 id={`${c.id}-title`} className={styles.categoryTitle}>
              {c.label}
            </h3>
            <p className={styles.categorySubtitle}>{c.subtitle}</p>
          </header>

          <div className={styles.tierGrid}>
            {c.tiers.map((tier) => (
              <div key={tier.name} className={styles.tierCard}>
                <div className={styles.tierTop}>
                  <div className={styles.tierNameRow}>
                    <h4 className={styles.tierName}>{tier.name}</h4>
                    <div className={styles.tierMeta}>
                      <span className={styles.priceRange}>{tier.priceRange}</span>
                      <span className={styles.period}>{tier.period}</span>
                    </div>
                  </div>
                </div>

                <ul className={styles.deliverables}>
                  {tier.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

