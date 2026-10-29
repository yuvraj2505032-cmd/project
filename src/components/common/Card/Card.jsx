import styles from "./Card.module.css";

function Card({
  children,
  variant = "default",
  size = "medium",
  hoverable = false,
  padding = "medium",
  as: Component = "div",
  className = "",
  ...props
}) {
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[size],
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={cardClasses}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;