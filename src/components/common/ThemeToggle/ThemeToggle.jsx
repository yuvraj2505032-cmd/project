import { Moon, Sun } from "lucide-react";

import IconButton from "../IconButton/IconButton";
import { useTheme } from "../../../context/ThemeContext";

import styles from "./ThemeToggle.module.css";

function ThemeToggle({ className = "" }) {
  const {
    mode,
    toggleMode,
  } = useTheme();

  const isDark = mode === "dark";

  const combinedClassName = [
    styles.toggle,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <IconButton
      icon={
        isDark ? (
          <Sun />
        ) : (
          <Moon />
        )
      }
      label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      variant="ghost"
      className={combinedClassName}
      onClick={toggleMode}
    />
  );
}

export default ThemeToggle;