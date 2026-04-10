"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileNewsPage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>News · 移动端资讯</h1>
          <p className={styles.lede}>
            用更短的摘要与卡片列表呈现动态：快速浏览标题、抓住重点，再进入单篇阅读。
          </p>

          <div className={styles.ctaRow}>
            <form action="/news-single" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                打开示例文章
              </Button>
            </form>
            <form action="/tickets" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                去购票
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>最新动态（示例）</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>议程更新：新增 2 场 Workshop</p>
              <p className={styles.cardBody}>
                面向工程实践与 AI 工具链，新增动手课名额；建议尽早锁定席位。
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>参会指南：交通与入场流程</p>
              <p className={styles.cardBody}>
                建议错峰到场；移动端会优先展示签到入口、地图与关键注意事项。
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>你可能关心</h2>
          <ul className={styles.list}>
            <li>如何获取会后资料包？（通常随购票邮箱发放）</li>
            <li>是否支持团购/对公？（可在 Contact 留言）</li>
            <li>赞助商/合作伙伴入口在哪里？（查看 Contact）</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
