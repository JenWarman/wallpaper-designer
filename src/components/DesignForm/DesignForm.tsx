import { createDesignByUserId } from "../../supabase/supabase";
import type { FormDataType } from "../../types/types";
import { dataTestIds } from "../../utils/dataTestIds";
import { Cta } from "../Cta/Cta";
import styles from "./DesignForm.module.scss";
import { useSearchParams } from "react-router";

export function DesignForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const formData: FormDataType = {
    theme: searchParams.get("theme") ?? "",
    motif: searchParams.get("motif") ?? "",
    scale: searchParams.get("scale") ?? "",
    "background-colour": searchParams.get("background-colour") ?? "",
    repeat: searchParams.get("repeat") ?? "",
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextParams = new URLSearchParams(formData);

    if (event.target.value === "") {
      nextParams.delete(event.target.name);
    } else {
      nextParams.set(event.target.name, event.target.value);
    }

    setSearchParams(nextParams);
  };

  const handleSaveDesign = async () => {
    await createDesignByUserId(searchParams.toString());
  };

  const handleClearForm = () => {
    setSearchParams({})     
  }


  return (
    <div className={styles.designForm__container}>
      <form className={styles.designForm}>
        <select
          name="theme"
          id="theme"
          value={formData.theme}
          className={styles.designForm__select}
          onChange={handleChange}
          aria-label="Select wallpaper theme."
        >
          <option value="">Select Theme</option>
          <option value="floral">Floral</option>
        </select>
        <select
          name="motif"
          id="motif"
          value={formData.motif}
          className={styles.designForm__select}
          onChange={handleChange}
           aria-label="Select wallpaper motif."
        >
          <option value="">Select Motif</option>
          <option value="orchid">Orchid</option>
          <option value="daisy">Daisy</option>
          <option value="rose">Rose</option>
        </select>
        <select
          name="scale"
          id="scale"
          className={styles.designForm__select}
          value={formData.scale}
          onChange={handleChange}
           aria-label="Select wallpaper scale."
        >
          <option value="">Select Scale</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <select
          name="background-colour"
          id="background-colour"
          value={formData["background-colour"]}
          className={styles.designForm__select}
          onChange={handleChange}
           aria-label="Select wallpaper background colour."
        >
          <option value="">Select Background Colour</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
        </select>
        <select
          name="repeat"
          id="repeat"
          className={styles.designForm__select}
          value={formData.repeat}
          onChange={handleChange}
           aria-label="Select wallpaper repeat style."
        >
          <option value="">Select Pattern Repeat</option>
          <option value="tile">Tile</option>
          <option value="half-drop">Half Drop</option>
        </select>
      </form>
      <div className={styles.designForm__Ctas}>
        <Cta
          ctaFunction={handleSaveDesign}
          dataTestId={dataTestIds.cta}
          label="Save"
          ariaLabel="save your design"
          type="button"
          disabled={searchParams.size === 0}
        />
        <Cta ctaFunction={handleClearForm} dataTestId={dataTestIds.cta} label="Cancel" ariaLabel="cancel and clear form." type="button"/>
      </div>
    </div>
  );
}
