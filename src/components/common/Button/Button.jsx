import styles from "./Button.module.css";

function Button({
  children,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "right",
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}

          <span className={styles.label}>{children}</span>

          {icon && iconPosition === "right" && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}

export default Button;