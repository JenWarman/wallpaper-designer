import { dataTestIds } from "../../utils/dataTestIds";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./Modal.module.scss";
import { parseDesignUrl } from "../../utils/parseDesignUrl";
import { Cta } from "../Cta/Cta";

type ModalProps = {
  url: string;
  onClose: () => void;
  mainCtaFunction: () => void;
  mainCtaLabel: string;
  secondaryCtaFunction: () => void;
  secondaryCtaLabel: string;
  tertiaryCtaFunction: ()=> void;
  tertiaryCtaLabel: string;
  confirmDelete?: boolean;
  onConfirmDelete?: () => void;
  onCancelDelete?: () => void;
};

export function Modal({
  url,
  onClose,
  mainCtaFunction,
  mainCtaLabel,
  secondaryCtaLabel,
  secondaryCtaFunction,
  tertiaryCtaLabel,
  tertiaryCtaFunction,
  confirmDelete,
  onConfirmDelete,
  onCancelDelete
}: ModalProps) {

  const designObj = parseDesignUrl(url);
  
  return (
    <dialog className={styles.modal__container} data-testid={dataTestIds.modal}>
      <img
        src="src/assets/close.png"
        alt=""
        onClick={onClose}
        aria-label="close"
        className={styles.modal__close}
        data-testid={dataTestIds.modalClose}
      />
      <div className={styles.modal__pattern}>
        <PatternDesign design={designObj} component="saved" />
      </div>

      <div className={styles.modal__order}>
        <button
          onClick={mainCtaFunction}
          aria-label={`${mainCtaLabel} your design`}
          className={styles.modal__orderCta}
        >
          {mainCtaLabel}
        </button>
      </div>

      <div className={styles.modal__ctas}>
        <button
          className={styles.modal__edit}
          aria-label={`${secondaryCtaLabel} your design`}
          onClick={secondaryCtaFunction}
        >
          <img
            className={styles.modal__icon}
            src={`src/assets/${secondaryCtaLabel}.png`}
          />
          {secondaryCtaLabel}
        </button>
         <button
          className={styles.modal__edit}
          aria-label={`${tertiaryCtaLabel} your design`}
          onClick={tertiaryCtaFunction}
        >
          <img
            className={styles.modal__icon}
            src={`src/assets/${tertiaryCtaLabel}.png`}
          />
          {tertiaryCtaLabel}
        </button>
      </div>
      {confirmDelete && (
        <div className={styles.modal__confirmation}>
          <p className={styles.modal__confirmationText}>Are you sure you want to delete this design?</p>
          <div className={styles.modal__confirmationCtas}>
          <Cta
            ctaFunction={onConfirmDelete}
            label="Delete"
            ariaLabel="confirm delete"
            dataTestId={dataTestIds.cta}
            type="button"
          />
          <Cta
            ctaFunction={onCancelDelete}
            label="Cancel"
            ariaLabel="cancel deletion"
            dataTestId={dataTestIds.cta}
            type="button"
          />
          </div>
        </div>
      )}
    </dialog>
  );
}
