import { useState } from "react";
import styles from "./Archive.module.scss";
import useStatusToSearchDesigns from "../../hooks/useStatusToSearchDesigns";
import { dataTestIds } from "../../utils/dataTestIds";
import { Card } from "../Card/Card";
import { Modal } from "../Modal/Modal";
import { useNavigate } from "react-router";
import { deleteDesignByUserId, updateProgressStatusByDesign } from "../../supabase/supabase";

export function Archive() {
  const [toggleModal, setToggleModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
   const [confirmDelete, setConfirmDelete] = useState(false)
   const navigate = useNavigate()

  const { filteredDesigns: archivedDesigns } = useStatusToSearchDesigns(
    "archived",
    toggleModal,
  );

  const handleToggleModal = (design_url: string) => {
    setToggleModal((prev) => !prev);
    setModalUrl(design_url);
  };

  const handleCloseModal = () => {
    setToggleModal(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false)
  }

   const handleDeleteDesign = async () => {
      await deleteDesignByUserId(modalUrl);
      setConfirmDelete(false);
      setToggleModal(false)
    };

  const handleRestoreDesign =  async() => {
      await updateProgressStatusByDesign(modalUrl, "archived", "saved")
      navigate("/saved-designs")
  }
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
              handleToggleModal(design.design_url)
            }
            design_url={design.design_url}
            created_at={design.created_at}
            message="Archived: "
          />
        ))}
      </div>
      {toggleModal && (
        <Modal
          url={modalUrl}
          onClose={handleCloseModal}
          mainCtaFunction={handleDeleteDesign}
          mainCtaLabel="delete"
          secondaryCtaFunction={() => navigate(`/design?${modalUrl}`)}
          secondaryCtaLabel="edit"
          tertiaryCtaFunction={handleRestoreDesign}
          tertiaryCtaLabel="restore"
          confirmDelete={confirmDelete}
          onConfirmDelete={handleDeleteDesign}
          onCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
}
