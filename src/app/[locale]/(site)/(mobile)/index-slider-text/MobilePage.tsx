"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileIndexSliderTextPage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>Index Slider Text · 移动端</h1>
          <p className={styles.lede}>
            当“文案信息密度”更高时，移动端更适合用分段卡片：标题清晰、条目短小。
          </p>

          <div className={styles.ctaRow}>
            <form action="/news" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                阅读新闻
              </Button>
            </form>
            <form action="/contact" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                联系我们
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>信息结构（示例）</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>一句话价值主张</p>
              <p className={styles.cardBody}>
                把关键利益点放在首句，随后再补充证据/数据或场景说明。
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>3 个关键卖点</p>
              <p className={styles.cardBody}>每条 8-12 个字，滚动时一眼扫过。</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>本场你能听到</h2>
          <ul className={styles.list}>
            <li>如何从 0→1 搭建 AI 产品指标体系</li>
            <li>工程侧的评估、监控与灰度策略</li>
            <li>从“演示”走向“交付”的落地经验</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
