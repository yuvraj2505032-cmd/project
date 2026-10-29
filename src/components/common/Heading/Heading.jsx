import styles from "./Heading.module.css";

function Heading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "large",
  as: Component = "h2",
  className = "",
}) {
  const headingClasses = [
    styles.heading,
    styles[align],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={headingClasses}>
      {eyebrow && (
        <span className={styles.eyebrow}>
          {eyebrow}
        </span>
      )}

      {title && (
        <Component className={styles.title}>
          {title}
        </Component>
      )}

      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </div>
  );
}

export default Heading;