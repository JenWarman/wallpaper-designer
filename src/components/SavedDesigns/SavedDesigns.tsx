import { useState } from "react";
import styles from "./SavedDesigns.module.scss";
import { Modal } from "../Modal/Modal";
import { dataTestIds } from "../../utils/dataTestIds";
import { Link } from "react-router";
import useStatusToSearchDesigns from "../../hooks/useStatusToSearchDesigns";
import { Card } from "../Card/Card";

export function SavedDesigns() {
  const [toggleModal, setToggleModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

  const handleToggleModal = (design_url: string) => {
    setToggleModal((prev) => !prev);
    setModalUrl(design_url);
  };

  const handleCloseModal = () => {
    setToggleModal(false);
  };

  const { filteredDesigns: designs } = useStatusToSearchDesigns(
    "saved",
    toggleModal,
  );

  return (
    <div className={styles.savedDesigns} data-testid={dataTestIds.savedDesigns}>
      <div className={styles.savedDesigns__container}>
        <h1 className={styles.savedDesigns__heading}>Your Designs</h1>
        {designs.length === 0 && (
          <>
            <p>You don't have any saved designs yet.</p>
            <p>
              Get started <Link to={"/design"}>here.</Link>
            </p>
          </>
        )}
        <div className={styles.savedDesigns__cardContainer}>
          {designs.map(({ design_url, created_at }) => (
            <Card
              key={created_at}
              handleClick={() => handleToggleModal(design_url)}
              design_url={design_url}
              created_at={created_at}
              message="Last edited: "
            />
          ))}
        </div>
        {toggleModal && (
          <Modal url={modalUrl} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
