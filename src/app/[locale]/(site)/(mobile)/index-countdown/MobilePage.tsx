"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileIndexCountdownPage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>Index Countdown · 移动端</h1>
          <p className={styles.lede}>
            倒计时模板主打“临近开场”的紧迫感。移动端将信息压缩为进度提示 + 行动入口。
          </p>

          <div className={styles.ctaRow}>
            <form action="/tickets" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                抢票入口
              </Button>
            </form>
            <form action="/contact" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                参会咨询
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>倒计时要传达什么</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>关键节点</p>
              <p className={styles.cardBody}>开场时间 / 报到截止 / 早鸟结束（示例）。</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>立即行动</p>
              <p className={styles.cardBody}>把“购票/咨询”放在同一屏，减少跳转与犹豫。</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>快速准备清单</h2>
          <ul className={styles.list}>
            <li>确认门票与入场信息（二维码/邮件）</li>
            <li>规划交通与住宿（建议提前 1-2 周）</li>
            <li>准备问题清单：你最想和讲者讨论什么？</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
