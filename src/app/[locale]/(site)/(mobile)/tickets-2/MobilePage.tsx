"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileTickets2Page() {
  const { locale } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>Tickets 2 · 移动端票务</h1>
          <p className={styles.lede}>
            这里展示更细分的票型/套餐示例：适合对比权益、选择最匹配的参会方式。
          </p>

          <div className={styles.ctaRow}>
            <form
              action={withLocale(locale, routes.tickets)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                返回购票入口
              </Button>
            </form>
            <form
              action={withLocale(locale, routes.contact)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                团购/合作咨询
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>推荐套餐</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>团队票（3-5 人）</p>
              <p className={styles.cardBody}>
                适合小团队一起参会：可打包报名、统一开票，并获得专属签到引导。
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Workshop 加购</p>
              <p className={styles.cardBody}>
                在主会场之外增加动手环节名额；适合希望“带走成果”的参会者。
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>选票建议（快速判断）</h2>
          <ul className={styles.list}>
            <li>看内容：只参加主会场 → Standard；重社交/深度交流 → VIP。</li>
            <li>看团队：多人同行 → 团队票；单人提升技能 → Workshop 加购。</li>
            <li>看时间：越早购票越容易锁定心仪场次与座位区域。</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
