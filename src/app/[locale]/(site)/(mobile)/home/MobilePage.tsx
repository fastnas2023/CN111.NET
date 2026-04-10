"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileHomePage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>Aivent · 移动端首页</h1>
          <p className={styles.lede}>
            精简信息、快速入口、可读性优先：用于在小屏设备上浏览活动核心内容。
          </p>

          <div className={styles.ctaRow}>
            <form action="/tickets" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                去购票
              </Button>
            </form>
            <form action="/news" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                查看新闻
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>活动亮点</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>主题演讲 + Workshop</p>
              <p className={styles.cardBody}>
                关注“可落地”的实践：案例拆解、工具链、以及现场动手环节。
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>社交与招聘</p>
              <p className={styles.cardBody}>
                与讲者/同好面对面交流；也可在展区投递简历或交换名片。
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>你将获得</h2>
          <ul className={styles.list}>
            <li>精选议题路线：工程、产品、设计、增长</li>
            <li>会后资料包：PPT、录屏链接与延伸阅读</li>
            <li>现场支持：志愿者、导览与补给点</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>需要帮助？</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>联系我们</p>
              <p className={styles.cardBody}>
                关于票务、合作或场地问题，建议直接进入 Contact 页面留言。
              </p>
            </div>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
