import { useState } from "react";
import styles from "./Archive.module.scss";
import { type DesignData } from "../../types/types";
import { ArchiveModal } from "../ArchiveModal/ArchiveModal";
import useStatusToSearchDesigns from "../../hooks/useStatusToSearchDesigns";
import { dataTestIds } from "../../utils/dataTestIds";
import { Card } from "../Card/Card";

export function Archive() {
  const [toggleModal, setToggleModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalData, setModalData] = useState<DesignData>({
    theme: "",
    motif: "",
    scale: "",
    colour: "",
    repeat: "",
  });

  const { filteredDesigns: archivedDesigns } = useStatusToSearchDesigns(
    "archived",
    toggleModal,
  );

  const handleToggleModal = (design_url: string, design_data: DesignData) => {
    setToggleModal((prev) => !prev);
    setModalUrl(design_url);
    setModalData(design_data);
  };

  const handleCloseModal = () => {
    setToggleModal(false);
  };

  return (
    <div
      className={styles.archive__container}
      data-testid={dataTestIds.archive}
    >
      <h1>Archived Designs</h1>
      <div className={styles.archive__cardContainer}>
        {archivedDesigns.map((design) => (
          <Card
            key={design.created_at}
            handleClick={() =>
              handleToggleModal(design.design_url, design.design_data)
            }
            design_data={design.design_data}
            design_url={design.design_url}
            created_at={design.created_at}
            message="Archived: "
          />
        ))}
      </div>
      {toggleModal && (
        <ArchiveModal
          url={modalUrl}
          design={modalData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
