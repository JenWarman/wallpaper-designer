import { useEffect, useState } from "react";
import { fetchDesignsByUserId } from "../../supabase/supabase";
import { Link } from "react-router";
import styles from "./SavedDesigns.module.scss";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import type { SavedDesign } from "../../types/types";
import { Modal } from "../Modal/Modal";

export function SavedDesigns() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const fetchDesigns = async () => {
      const result = await fetchDesignsByUserId();
      console.log(result);

      if (!result) return;

      setDesigns(result.data);
    };
    fetchDesigns();
  }, []);

  const handleToggleModal = (design_url: string, design_data: {theme: "", motif: "", scale: "", colour: "", repeat: ""}) => {
    console.log(design_data, "data in toggle");
    console.log(design_url, "url in toggle");
    setToggleModal(!toggleModal);
    setModalUrl(design_url);
    setModalData(design_data);
  };

  console.log(modalData);
  console.log(modalUrl);

  return (
    <div className={styles.savedDesigns}>
      <div className={styles.savedDesigns__container}>
        <h1 className={styles.savedDesigns__heading}>Your Designs</h1>
        {/* <ul>
          {savedDesignsUrl.map((url) => (
            <li key={url}>
              <Link to={`/design?${url}`}>HERE</Link>
            </li>
          ))}
        </ul> */}
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
        {toggleModal && <Modal url={modalUrl} design={modalData} />}
      </div>
    </div>
  );
}
