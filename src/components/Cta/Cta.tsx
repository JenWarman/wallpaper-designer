import styles from "./Cta.module.scss"

type CtaProps = {
  label: string;
  ctaFunction?: () => void;
  dataTestId: string;
  disabled?: boolean;
  ariaLabel: string;
  type: 'submit' | 'reset' | 'button' | undefined
};

export function Cta({
  label,
  ctaFunction,
  dataTestId,
  disabled,
  ariaLabel,
  type= "submit"
}: CtaProps) {
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
