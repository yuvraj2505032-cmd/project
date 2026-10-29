import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(function Input(
  {
    label,
    hint,
    error,
    success,
    leftIcon,
    rightIcon,
    id,
    name,
    type = "text",
    placeholder,
    value,
    defaultValue,
    onChange,
    required = false,
    disabled = false,
    readOnly = false,
    fullWidth = true,
    className = "",
    inputClassName = "",
    ...props
  },
  ref
) {
  const generatedId =
    id ||
    (name
      ? `input-${name}`
      : undefined);

  const descriptionId = hint
    ? `${generatedId}-hint`
    : undefined;

  const errorId = error
    ? `${generatedId}-error`
    : undefined;

  const describedBy = [
    descriptionId,
    errorId,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const wrapperClasses = [
    styles.field,
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputWrapperClasses = [
    styles.inputWrapper,
    error ? styles.hasError : "",
    success ? styles.hasSuccess : "",
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    styles.input,
    leftIcon ? styles.hasLeftIcon : "",
    rightIcon ? styles.hasRightIcon : "",
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          htmlFor={generatedId}
          className={styles.label}
        >
          <span>{label}</span>

          {required && (
            <span
              className={styles.required}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      <div className={inputWrapperClasses}>
        {leftIcon && (
          <span
            className={`${styles.icon} ${styles.leftIcon}`}
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={generatedId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
          className={inputClasses}
          {...props}
        />

        {rightIcon && (
          <span
            className={`${styles.icon} ${styles.rightIcon}`}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <p
          id={errorId}
          className={styles.error}
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={descriptionId}
          className={styles.hint}
        >
          {hint}
        </p>
      ) : null}

      {success && !error && (
        <p className={styles.successMessage}>
          {success}
        </p>
      )}
    </div>
  );
});

export default Input;