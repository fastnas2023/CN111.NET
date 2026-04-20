import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";
import Link from "next/link";
import ResponsiveRoute from "./_routing/ResponsiveRoute";
import { MobileHomePage } from "./(mobile)/home/MobilePage";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";
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
              <h1 className={styles.h1}>{t("v1.home.hero.title")}</h1>
              <p className={styles.lede}>{t("v1.home.hero.lede")}</p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>{t("v1.home.entrySection.title")}</h2>
              <div className={styles.grid2}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{t("v1.home.entry.growth.title")}</h3>
                  <p className={styles.cardBody}>{t("v1.home.entry.growth.body")}</p>
                  <Link
                    className={styles.ctaLink}
                    href={withLocale(locale, routes.solutions)}
                  >
                    {t("v1.home.entry.growth.cta")}
                  </Link>
                </div>

                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{t("v1.home.entry.ai.title")}</h3>
                  <p className={styles.cardBody}>{t("v1.home.entry.ai.body")}</p>
                  <Link
                    className={styles.ctaLink}
                    href={withLocale(locale, routes.services)}
                  >
                    {t("v1.home.entry.ai.cta")}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </V1DesktopShell>
      }
      mobile={<MobileHomePage />}
    />
  );
}
