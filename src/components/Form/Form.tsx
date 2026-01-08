import { dataTestIds } from "../../utils/dataTestIds";
import { Cta } from "../Cta/Cta";
import styles from "./Form.module.scss";

type FormProps = {
  action: React.FormHTMLAttributes<HTMLFormElement>["action"];
  children: React.ReactNode;
  ctaLabel: string;
  dataTestId: string;
  ctaAriaLabel: string;
  ctaDisabled?: boolean;
};

export function Form({
  action,
  children,
  ctaLabel,
  dataTestId,
  ctaAriaLabel,
  ctaDisabled,
}: FormProps) {
  return (
    <form action={action} className={styles.form} data-testid={dataTestId}>
      {children}
      <Cta
        dataTestId={dataTestIds.cta}
        label={ctaLabel}
        type="submit"
        ariaLabel={ctaAriaLabel}
        disabled={ctaDisabled}
      />
    </form>
  );
}
