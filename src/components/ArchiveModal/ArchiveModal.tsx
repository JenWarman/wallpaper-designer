import { useNavigate } from "react-router";
import { dataTestIds } from "../../utils/dataTestIds";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./ArchiveModal.module.scss";
import { deleteDesignByUserId, updateProgressStatusByDesign } from "../../supabase/supabase";
import { useState } from "react";
import { Cta } from "../Cta/Cta";

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

export function ArchiveModal({ url, design, onClose }: ModalProps) {
    const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleDeleteDesign = async () => {
    await deleteDesignByUserId(url);
    setConfirmDelete(false)
    onClose();
  };


const handleRestoreDesign =  async() => {
    await updateProgressStatusByDesign(url, "archived", "saved")
    navigate("/saved-designs")
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
          onClick={handleConfirmDelete}
          aria-label="delete your design"
          className={styles.modal__orderCta}
        >
          Delete
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
          onClick={handleRestoreDesign}
        >
          <img className={styles.modal__icon} src="src/assets/reset.png" />
          Restore
        </button>
      </div>
      {confirmDelete && (
        <div className={styles.modal__confirmation}>
          <p className={styles.modal__confirmationText}>Are you sure you want to delete this design?</p>
          <div className={styles.modal__confirmationCtas}>
          <Cta
            ctaFunction={handleDeleteDesign}
            label="Delete"
            ariaLabel="confirm delete"
            dataTestId={dataTestIds.cta}
            type="button"
          />
          <Cta
            ctaFunction={() => setConfirmDelete(false)}
            label="Cancel"
            ariaLabel="cancel deletion"
            dataTestId={dataTestIds.cta}
            type="button"
          />
          </div>
        </div>
      )}
    </div>
  );
}
