import React from "react";

import { V1Section } from "@/components/site/v1/V1Section";
import styles from "./solutions.module.scss";

export type DeliverableRow = {
  deliverable: string;
  description: string;
  format: string;
};

export function DeliverablesTable(props: { title?: string; rows: DeliverableRow[] }) {
  return (
    <V1Section title={props.title ?? "交付物（Deliverables）"}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>交付物</th>
              <th className={styles.th}>说明</th>
              <th className={styles.th}>形式</th>
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row) => (
              <tr key={row.deliverable}>
                <td className={styles.td}>{row.deliverable}</td>
                <td className={styles.td}>{row.description}</td>
                <td className={styles.td}>{row.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </V1Section>
  );
}

