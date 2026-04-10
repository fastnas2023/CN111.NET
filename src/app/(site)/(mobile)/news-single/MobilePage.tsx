"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "@/app/(site)/(mobile)/_shared/MobileLanding.module.scss";

export function MobileNewsSinglePage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>News Single · 移动端文章</h1>
          <p className={styles.lede}>
            单篇内容以“要点 + 卡片”优先：减少大段排版成本，方便在手机上快速阅读与回看。
          </p>

          <div className={styles.ctaRow}>
            <form action="/news" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                返回新闻列表
              </Button>
            </form>
            <form action="/tickets" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                现在购票
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>文章要点（示例）</h2>
          <ul className={styles.list}>
            <li>议程与讲者在持续更新：建议收藏页面或订阅通知。</li>
            <li>移动端优先展示“下一步行动”：购票、路线、联系方式。</li>
            <li>需要对公/团购/媒体合作，可直接进入 Contact 留言。</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>相关链接</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>活动票务</p>
              <p className={styles.cardBody}>查看票种与权益，选择合适的参会方式。</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>联系我们</p>
              <p className={styles.cardBody}>商务合作、赞助、媒体报名与现场支持。</p>
            </div>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}

