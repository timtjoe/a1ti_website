import styles from './StaffCard.module.css';

export function StaffCard({ name, qualification, phone }) {
  return (
    <article className={styles.card}>
      <div className={styles.avatar} aria-hidden="true">
        <span className="material-symbols-outlined">person</span>
      </div>
      <h3>{name}</h3>
      <p className={styles.fieldLabel}>Qualification</p>
      <p className={styles.value}>{qualification}</p>
      <p className={styles.fieldLabel}>Phone</p>
      <p className={styles.value}>{phone}</p>
    </article>
  );
}

export default StaffCard;
