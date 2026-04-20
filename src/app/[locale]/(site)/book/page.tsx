import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../_routing/ResponsiveRoute";
import { MobileBookPage } from "../(mobile)/book/MobilePage";
import { V1DesktopShell } from "@/components/site/v1/V1DesktopShell";
import styles from "@/components/site/v1/V1Page.module.scss";

export default async function Page(props: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await props.params;
  const messages = await getMessages(locale);
  const t = createT(messages);

  return (
    <ResponsiveRoute
      desktop={
        <V1DesktopShell>
          <section className={styles.hero}>
            <div className={styles.container}>
              <p className={styles.kicker}>{t("v1.kicker")}</p>
              <h1 className={styles.h1}>{t("v1.book.title")}</h1>
              <p className={styles.lede}>{t("v1.book.lede")}</p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>{t("v1.section.placeholderTitle")}</h2>
              <div className={styles.placeholder}>{t("v1.section.placeholderBody")}</div>
            </div>
          </section>
        </V1DesktopShell>
      }
      mobile={<MobileBookPage />}
    />
  );
}

