import type { DropDownProps } from "../../types/types";
import { dataTestIds } from "../../utils/dataTestIds";
import styles from "./DropDown.module.scss";

export function DropDown({
  label,
  onChange,
  value,
  options,
  ariaLabel,
}: DropDownProps) {
  return (
    <div
      className={styles.dropDown__container}
      data-testid={dataTestIds.dropDown}
    >
      {/* <label className={styles.dropDown__label} htmlFor={label}>{label}</label> */}
      <select
        className={styles.dropDown__select}
        name={label}
        id={label}
        onChange={(event) => onChange(event)}
        value={value}
        aria-label={ariaLabel}
      >
        <option className={styles.dropDown_option} value="">
          {label}
        </option>
        {options.map((option) => (
          <option
            className={styles.dropDown_option}
            value={option}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
