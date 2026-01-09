import styles from "./Input.module.scss";

type InputProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  ariaLabel: string;
  name: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId: string;
};

export function Input({
  id,
  label,
  type,
  placeholder,
  ariaLabel,
  name,
  onChange,
  onBlur,
  dataTestId,
}: InputProps) {
  return (
    <div className={styles.input}>
      <label className={styles.input__label} htmlFor={id}>
        {label}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          aria-label={ariaLabel}
          onChange={onChange}
          onBlur={onBlur}
          data-testid={dataTestId}
          className={styles.input__input}
        />
      </label>
    </div>
  );
}
