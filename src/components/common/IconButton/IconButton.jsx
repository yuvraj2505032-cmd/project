import styles from "./IconButton.module.css";

function IconButton({
  icon,
  label,
  variant = "default",
  size = "medium",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
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
      aria-label={label}
      title={label}
      {...props}
    >
      {loading ? (
        <span
          className={styles.spinner}
          aria-hidden="true"
        />
      ) : (
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
    </button>
  );
}

export default IconButton;