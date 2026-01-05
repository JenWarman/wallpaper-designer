import styles from "./Form.module.scss";

type FormProps = {
  onSubmit: (value: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  ctaLabel: string;
};

export function Form({ onSubmit, children, ctaLabel }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
      <button className={styles.form__cta}>{ctaLabel}</button>
    </form>
  );
}
