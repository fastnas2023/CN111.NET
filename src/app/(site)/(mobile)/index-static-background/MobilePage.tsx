"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "@/app/(site)/(mobile)/_shared/MobileLanding.module.scss";

export function MobileIndexStaticBackgroundPage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>Index Static Background · 移动端</h1>
          <p className={styles.lede}>
            静态背景更适合承载稳定信息（时间/地点/主题）。移动端以卡片形式组织内容。
          </p>

          <div className={styles.ctaRow}>
            <form action="/tickets" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                购买门票
              </Button>
            </form>
            <form action="/news" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                最新动态
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>核心信息</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>时间</p>
              <p className={styles.cardBody}>2026 / 08 / 08 - 08 / 09（示例）</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>地点</p>
              <p className={styles.cardBody}>City Convention Center（示例）</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>主题</p>
              <p className={styles.cardBody}>AI + Design + Engineering（示例）</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>适合谁来</h2>
          <ul className={styles.list}>
            <li>想快速了解趋势与实践落地方法的人</li>
            <li>需要建立行业人脉、寻找合作机会的人</li>
            <li>对产品、工程、设计交叉领域感兴趣的人</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
