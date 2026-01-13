import type { CtaProps } from "../../types/types";
import styles from "./Cta.module.scss"

export function Cta({
  label,
  ctaFunction,
  dataTestId,
  disabled,
  ariaLabel,
  type= "submit"
}: CtaProps) {

  if (type === "submit") {
    return (
      <button
      data-testid={dataTestId}
      disabled={disabled}
      aria-label={ariaLabel}
      type={type}
      className={styles.cta}
      >{label}</button>
    )
  }
  return (
    <button
      onClick={ctaFunction}
      data-testid={dataTestId}
      disabled={disabled}
      aria-label={ariaLabel}
      type={type}
      className={styles.cta}
    >
      {label}
    </button>
  );
}
