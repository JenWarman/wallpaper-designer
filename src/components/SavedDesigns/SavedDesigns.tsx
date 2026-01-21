import { useEffect, useState } from "react";
import { fetchDesignsByUserId } from "../../supabase/supabase";
import { Link } from "react-router";
import styles from "./SavedDesigns.module.scss";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import type { SavedDesign } from "../../types/types";

export function SavedDesigns() {

  const [designs, setDesigns] = useState<SavedDesign[]>([])

  useEffect(() => {
    const fetchDesigns = async () => {
      const result = await fetchDesignsByUserId()
      console.log(result)

      if (!result) return

      setDesigns(result.data)

    }
    fetchDesigns()
  }, []);

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
          {designs.map(({design_url, design_data}) => (
            <PatternDesign key={design_url} design={design_data} component="saved"/>
          ))}
        </div>
      </div>
    </div>
  );
}
