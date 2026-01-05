import styles from "./Input.module.scss";

type InputProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel: string;
};

export function Input({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  ariaLabel,
}: InputProps) {

  return (
    <>
      <label className={styles.input__label} htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className={type !== "radio" ? styles.input__input : styles.input__radio}
      />
    </>
  );
}
