import { useEffect, useState } from "react";
import styles from "./Archive.module.scss";
import {
  fetchDesignsByUserId,
  fetchProgressStatusByUserId,
} from "../../supabase/supabase";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import type { DesignData } from "../../types/types";
import { ArchiveModal } from "../ArchiveModal/ArchiveModal";

export function Archive() {
  const [archivedDesigns, setArchivedDesigns] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalData, setModalData] = useState<DesignData>({theme: "", motif: "", scale: "", colour: "", repeat: ""});

  useEffect(() => {
    (async () => {
      const designData = await fetchDesignsByUserId();
      const statusData = await fetchProgressStatusByUserId();

      const designs = designData?.data ?? [];
      const statuses = statusData?.status ?? [];

      const designMap = new Map(
        designs.map((design) => [design.design_url, design]),
      );

      const archive = statuses
        .filter((status) => status.status === "archived")
        .map((s) => {
          const design = designMap.get(s.design);

          if (!design) return null;

          return {
            design_url: s.design,
            design_data: design.design_data,
            created_at: design.created_at,
          };
        })
        .filter(Boolean);
      setArchivedDesigns(archive);
    })();
  }, [toggleModal]);

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
