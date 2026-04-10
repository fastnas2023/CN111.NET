"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileContactPage() {
  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>Contact · 移动端联系</h1>
          <p className={styles.lede}>
            票务、赞助、媒体或其它问题都可以在这里找到入口。移动端优先展示“怎么联系”和常见问题。
          </p>

          <div className={styles.ctaRow}>
            <form action="/tickets" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                先去购票
              </Button>
            </form>
            <form action="/news" method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                看最新动态
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>常用入口</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>票务 / 发票 / 团购</p>
              <p className={styles.cardBody}>
                建议在留言中注明：公司/姓名、人数、票型、是否需要对公与开票信息。
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>赞助 / 合作</p>
              <p className={styles.cardBody}>
                简要说明合作类型与预算范围，我们会尽快回复并提供赞助包。
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>提交前请准备</h2>
          <ul className={styles.list}>
            <li>问题背景 + 期望结果（例如：对公开票、赞助档位、媒体报名）</li>
            <li>可联系的邮箱/手机号</li>
            <li>如涉及订单：请附上下单邮箱或订单号（脱敏）</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
