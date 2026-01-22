import { useNavigate } from "react-router";
import { dataTestIds } from "../../utils/dataTestIds";
import { Cta } from "../Cta/Cta";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./Modal.module.scss";

type ModalProps = {
  url: string;
  design: {
    theme: string;
    motif: string;
    scale: string;
    colour: string;
    repeat: string;
  };
  onClose: () => void;
};

export function Modal({ url, design, onClose }: ModalProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.modal__container} data-testid={dataTestIds.modal}>
      <img
        src="src/assets/close.png"
        alt=""
        onClick={onClose}
        aria-label="close"
        className={styles.modal__close}
         data-testid={dataTestIds.modalClose}
      />
      <h1 className={styles.modal__heading}>Your Design</h1>
      <div className={styles.modal__pattern}>
        <PatternDesign design={design} component="saved" />
      </div>

      <div className={styles.modal__ctas}>
        <Cta
          label="Edit"
          ariaLabel="edit your design"
          type="button"
          dataTestId={dataTestIds.cta}
          ctaFunction={() => navigate(`/design?${url}`)}
        />
        <Cta
          label="Order"
          ariaLabel="order your design"
          type="button"
          dataTestId={dataTestIds.cta}
          ctaFunction={() => navigate(`/order?${url}`)}
        />
      </div>
    </div>
  );
}
