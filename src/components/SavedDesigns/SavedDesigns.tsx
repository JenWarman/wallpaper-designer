import { useEffect, useState } from "react"
import { fetchDesignsByUserId } from "../../supabase/supabase";
import { Link } from "react-router";
import styles from "./SavedDesigns.module.scss"

export function SavedDesigns() {
    const [savedDesignsUrl, setSavedDesignsUrl] = useState([]);

    useEffect(() => {
        (async () => {
          const savedDesigns = await fetchDesignsByUserId();
    
          if (savedDesigns?.data.length) {
            const designs = [];
            savedDesigns.data.filter((design) => {
              designs.push(design.design_url);
              setSavedDesignsUrl(designs);
            });
          }
        })();
      }, []);
    return (
        <div className={styles.savedDesigns}>
        <div className={styles.savedDesigns__container}>
        <p>See your saved designs </p>
        <ul>
          {savedDesignsUrl.map((url) => (
            <li key={url}>
              <Link to={`/design?${url}`}>HERE</Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
    )
}