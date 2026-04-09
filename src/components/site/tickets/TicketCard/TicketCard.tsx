"use client";

import React from "react";
import styles from "./TicketCard.module.scss";
import { QuantityStepper } from "@/components/site/tickets/QuantityStepper/QuantityStepper";

export type TicketDefinition = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  badge?: string;
  features?: string[];
  soldOut?: boolean;
};

export type TicketCardProps = {
  ticket: TicketDefinition;
  quantity: number;
  onQuantityChange: (ticketId: string, nextQty: number) => void;
  maxPerOrder?: number;
};

export function TicketCard({
  ticket,
  quantity,
  onQuantityChange,
  maxPerOrder = 10,
}: TicketCardProps) {
  const currency = ticket.currency ?? "USD";
  const disabled = Boolean(ticket.soldOut);

  return (
    <article className={[styles.card, disabled ? styles.soldOut : ""].join(" ")}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{ticket.name}</h3>
          {ticket.badge ? <span className={styles.badge}>{ticket.badge}</span> : null}
        </div>
        <p className={styles.desc}>{ticket.description}</p>
      </header>

      <div className={styles.priceRow}>
        <div className={styles.price}>
          <span className={styles.priceValue}>
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency,
              maximumFractionDigits: 0,
            }).format(ticket.price)}
          </span>
          <span className={styles.priceHint}>/ ticket</span>
        </div>

        <QuantityStepper
          value={quantity}
          min={0}
          max={maxPerOrder}
          disabled={disabled}
          onChange={(next) => onQuantityChange(ticket.id, next)}
          ariaLabel={`${ticket.name} 数量`}
        />
      </div>

      {ticket.features?.length ? (
        <ul className={styles.features}>
          {ticket.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ) : null}

      {disabled ? <div className={styles.soldOutLabel}>Sold out</div> : null}
    </article>
  );
}

