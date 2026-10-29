import styles from "./Divider.module.css";

function Divider({
  orientation = "horizontal",
  variant = "subtle",
  spacing = "medium",
  className = "",
}) {
  const dividerClasses = [
    styles.divider,
    styles[orientation],
    styles[variant],
    styles[spacing],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={dividerClasses}
      role="separator"
      aria-orientation={orientation}
    />
  );
}

export default Divider;