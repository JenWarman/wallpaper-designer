import styles from "./Input.module.scss";

type InputProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  ariaLabel: string;
  name: string
};

export function Input({
  id,
  label,
  type,
  placeholder,
  ariaLabel,
  name,
}: InputProps) {

  return (
    <>
      <label className={styles.input__label} htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        aria-label={ariaLabel}
        className={type !== "radio" ? styles.input__input : styles.input__radio}
      />
    </>
  );
}
