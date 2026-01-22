import { useEffect, useState } from "react";
import { fetchDesignsByUserId } from "../../supabase/supabase";
import styles from "./SavedDesigns.module.scss";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import { type DesignData, type SavedDesign } from "../../types/types";
import { Modal } from "../Modal/Modal";
import { dataTestIds } from "../../utils/dataTestIds";

export function SavedDesigns() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalData, setModalData] = useState<DesignData>({theme: "", motif: "", scale: "", colour: "", repeat: ""});

  useEffect(() => {
    const fetchDesigns = async () => {
      const result = await fetchDesignsByUserId();

      if (!result) return;
  
      setDesigns(result.data ?? []);
    };
    fetchDesigns();
  }, []);

  const handleToggleModal = (design_url: string, design_data: DesignData) => {
    setToggleModal(prev => !prev);
    setModalUrl(design_url);
    setModalData(design_data);
  };

  const handleCloseModal = () => {
    setToggleModal(false)
  }

  return (
    <div className={styles.savedDesigns} data-testid={dataTestIds.savedDesigns}>
      <div className={styles.savedDesigns__container}>
        <h1 className={styles.savedDesigns__heading}>Your Designs</h1>
        <div className={styles.savedDesigns__cardContainer}>
          {designs.map(({ design_url, design_data }) => (
            <div
              key={design_url}
              className={styles.savedDesigns__card}
              onClick={() => handleToggleModal(design_url, design_data)}
            >
              <PatternDesign design={design_data} component="saved" />
            </div>
          ))}
        </div>
        {toggleModal && <Modal url={modalUrl} design={modalData} onClose={handleCloseModal} />}
      </div>
    </div>
  );
}
