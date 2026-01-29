import { useNavigate } from "react-router";
import { dataTestIds } from "../../utils/dataTestIds";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./Modal.module.scss";
import {  updateProgressStatusByDesign } from "../../supabase/supabase";


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

  const handleArchiveDesign = async () => {
    await updateProgressStatusByDesign(url, "saved", "archived")
    navigate("/archive")
  }

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
      <div className={styles.modal__pattern}>
        <PatternDesign design={design} component="saved" />
      </div>

      <div className={styles.modal__order}>
        <button
          onClick={() => navigate(`/order?${url}`)}
          aria-label="order your design"
          className={styles.modal__orderCta}
        >
          Order
        </button>
      </div>

      <div className={styles.modal__ctas}>
        <button
          className={styles.modal__edit}
          aria-label="edit your design"
          onClick={() => navigate(`/design?${url}`)}
        >
          <img className={styles.modal__icon} src="src/assets/pencil.png" />
          Edit
        </button>
        <button
          className={styles.modal__edit}
          aria-label="archive your design"
          onClick={handleArchiveDesign}
        >
          <img className={styles.modal__icon} src="src/assets/archive.png" />
          Archive
        </button>
      </div>
    </div>
  );
}
