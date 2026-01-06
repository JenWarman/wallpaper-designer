import styles from "./Form.module.scss";

type FormProps = {
  action: React.FormHTMLAttributes<HTMLFormElement>["action"]
  children: React.ReactNode;
  ctaLabel: string;
};

export function Form({ action, children, ctaLabel }: FormProps) {
  return (
    <form action={action} className={styles.form}>
      {children}
      <button className={styles.form__cta}>{ctaLabel}</button>
    </form>
  );
}
