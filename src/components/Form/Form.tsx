import type { FormProps } from "../../types/types";
import { dataTestIds } from "../../utils/dataTestIds";
import { Cta } from "../Cta/Cta";
import styles from "./Form.module.scss";

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
        dataTestId={dataTestIds["form-cta"]}
        label={ctaLabel}
        type="submit"
        ariaLabel={ctaAriaLabel}
        disabled={ctaDisabled}
      />
    </form>
  );
}
