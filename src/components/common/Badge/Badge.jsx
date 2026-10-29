import styles from "./Badge.module.css";

function Badge({
  children,
  variant = "default",
  size = "medium",
  icon,
  dot = false,
  className = "",
}) {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
    
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses}>
      {dot && <span className={styles.dot} aria-hidden="true" />}

      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}

      <span>{children}</span>
    </span>
  );
}

export default Badge;