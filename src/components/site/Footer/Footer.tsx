import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>© {new Date().getFullYear()} Aivent Clone</div>
    </footer>
  );
}

