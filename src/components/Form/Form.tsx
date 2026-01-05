import styles from "./Form.module.scss";

type FormProps = {
  label: string[];
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (value: React.FormEvent<HTMLFormElement>) => void;
  arialabel: string;
  id: string;
  ctaLabel: string;
};

export function Form({
  label,
  type,
  placeholder,
  value,
  onChange,
  onSubmit,
  arialabel,
  id,
  ctaLabel,
}: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {label.length > 0 ? (
        label.map((label, index) => <label htmlFor={id} key={index}>{label}
        <input
        type={type}
        aria-label={arialabel}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      ></input>
        </label>)
      ) : (
        <label htmlFor={id}>{label}<input
        type={type}
        aria-label={arialabel}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      ></input></label>
      )}
      <button>{ctaLabel}</button>
    </form>
  );
}
