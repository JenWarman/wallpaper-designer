import { useState } from "react";
import styles from "./Archive.module.scss";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import { type DesignData } from "../../types/types";
import { ArchiveModal } from "../ArchiveModal/ArchiveModal";
import useStatusToSearchDesigns from "../../hooks/useStatusToSearchDesigns";

export function Archive() {
  const [toggleModal, setToggleModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalData, setModalData] = useState<DesignData>({theme: "", motif: "", scale: "", colour: "", repeat: ""});

  const {filteredDesigns: archivedDesigns} = useStatusToSearchDesigns("archived", toggleModal);

  const handleToggleModal = (design_url: string, design_data: DesignData) => {
    setToggleModal(prev => !prev);
    setModalUrl(design_url);
    setModalData(design_data);
  }

    const handleCloseModal = () => {
    setToggleModal(false)
  }

  return (
    <div className={styles.archive__container}>
      <h1>Archived Designs</h1>
      <div className={styles.archive__cardContainer}>
        {archivedDesigns.map((design) => (
          <div
            className={styles.archive__card}
            key={design.created_at}
            onClick={() => handleToggleModal(design.design_url, design.design_data)}
          >
            <PatternDesign design={design.design_data} component="saved" />
          </div>
        ))}
      </div>
      {toggleModal && <ArchiveModal url={modalUrl} design={modalData} onClose={handleCloseModal} />}
    </div>
  );
}
