"use client";

import Link from "next/link";
import Image from "next/image";

import styles from "./V1Hero.module.scss";

export type V1HeroProps = {
  kicker: string;
  title: string;
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?:
    | { type: "video"; src: string }
    | { type: "image"; src: string; alt: string };
};

export function V1Hero(props: V1HeroProps) {
  const kicker = props.kicker?.trim();
  return (
    <section className={styles.hero}>
      {props.background?.type === "video" ? (
        <video
          className={styles.bgVideo}
          src={props.background.src}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : props.background?.type === "image" ? (
        <Image
          className={styles.bgImage}
          src={props.background.src}
          alt={props.background.alt}
          fill
          priority
        />
      ) : null}

      <div className={styles.overlay} />

      <div className={styles.container}>
        {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.lede}>{props.lede}</p>

        <div className={styles.ctaRow}>
          <Link className={styles.primaryCta} href={props.primaryCta.href}>
            {props.primaryCta.label}
          </Link>
          {props.secondaryCta ? (
            <Link className={styles.secondaryCta} href={props.secondaryCta.href}>
              {props.secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
