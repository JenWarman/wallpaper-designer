import styles from "./Form.module.scss";

type FormProps = {
  action: React.FormHTMLAttributes<HTMLFormElement>["action"];
  children: React.ReactNode;
  ctaLabel: string;
  dataTestId: string;
};

export function Form({ action, children, ctaLabel, dataTestId }: FormProps) {
  return (
    <form action={action} className={styles.form} data-testid={dataTestId}>
      {children}
      <button className={styles.form__cta}>{ctaLabel}</button>
    </form>
  );
}
