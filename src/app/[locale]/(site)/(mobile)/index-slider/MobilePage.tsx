"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileIndexSliderPage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>Index Slider · 移动端</h1>
          <p className={styles.lede}>
            该模板强调“图片轮播 + 关键信息”。移动端在这里用更紧凑的结构呈现要点。
          </p>

          <div className={styles.ctaRow}>
            <form action="/tickets" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                立即购票
              </Button>
            </form>
            <form action="/contact" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                商务合作
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>移动端阅读策略</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>先结论，后细节</p>
              <p className={styles.cardBody}>
                关键 CTA 保持在首屏可见；轮播内容以“亮点条目”补充信息。
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>避免大段文本</p>
              <p className={styles.cardBody}>
                将信息拆成卡片或列表，单条不超过 2 行，滚动浏览更舒适。
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>轮播亮点（示例）</h2>
          <ul className={styles.list}>
            <li>Day 1：主题演讲 + 产品发布</li>
            <li>Day 2：Workshop + 圆桌讨论</li>
            <li>全天：展区、社交、赞助商活动</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
