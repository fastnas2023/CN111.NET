"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileTicketsPage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>Tickets · 移动端购票</h1>
          <p className={styles.lede}>
            为小屏设备优化的购票入口：先看票种，再确认权益与规则，最后一步完成下单。
          </p>

          <div className={styles.ctaRow}>
            <form action="/tickets-2" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                查看更多票种
              </Button>
            </form>
            <form action="/contact" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                票务咨询
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>票种速览</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Standard Pass</p>
              <p className={styles.cardBody}>
                适合首次参会：含主会场席位、会后资料包与展区通行。
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>VIP Pass</p>
              <p className={styles.cardBody}>
                更好的座位与快速通道；含讲者交流/晚宴等增值权益（以现场公告为准）。
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>购票须知</h2>
          <ul className={styles.list}>
            <li>请使用常用邮箱/手机号下单，便于收取电子票与通知。</li>
            <li>发票/对公信息可在 Contact 留言，我们会人工协助。</li>
            <li>如需改签/退票，以活动最终规则为准。</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
