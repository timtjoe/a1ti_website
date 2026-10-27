import styles from './StaffCard.module.css';

export function StaffCard({ name, qualification, image, imageAlt }) {
  return (
    <article className={styles.card}>
      {image ? (
        <img className={styles.portrait} src={image} alt={imageAlt || ''} loading="lazy" />
      ) : (
        <div className={styles.portraitPlaceholder} aria-hidden="true">
          <span className="material-symbols-outlined">person</span>
        </div>
      )}
      <h3>{name}</h3>
      <p className={styles.qualification}>{qualification}</p>
    </article>
  );
}

export default StaffCard;
