import styles from "./Section.module.css";

function Section({
  children,
  className = "",
  id,
  as: Component = "section",
  spacing = "default",
}) {
  return (
    <Component
      id={id}
      className={`${styles.section} ${styles[spacing]} ${className}`}
    >
      {children}
    </Component>
  );
}

export default Section;