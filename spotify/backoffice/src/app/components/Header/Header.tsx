import styles from "./Header.module.scss";
export default function Header() {
  return (
    <div className={styles.header}>
      <h2>
        logo | <a href="#"> menu</a>
      </h2>
    </div>
  );
}
