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
  return (
    <div className={styles.designForm__container}>
      <form className={styles.designForm}>
        <label className={styles.designForm__label} htmlFor="theme">
          Theme
        </label>
        <select
          name="theme"
          id="theme"
          value={formData.theme}
          className={styles.designForm__select}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="floral">Floral</option>
        </select>
        <label className={styles.designForm__label} htmlFor="motif">
          Motif
        </label>
        <select
          name="motif"
          id="motif"
          value={formData.motif}
          className={styles.designForm__select}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="orchid">Orchid</option>
          <option value="daisy">Daisy</option>
          <option value="rose">Rose</option>
        </select>
        <label className={styles.designForm__label} htmlFor="scale">
          Scale
        </label>
        <select
          name="scale"
          id="scale"
          className={styles.designForm__select}
          value={formData.scale}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <label className={styles.designForm__label} htmlFor="background-colour">
          Background Colour
        </label>
        <select
          name="background-colour"
          id="background-colour"
          value={formData["background-colour"]}
          className={styles.designForm__select}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
        </select>
        <label className={styles.designForm__label} htmlFor="repeat">
          Pattern Repeat
        </label>
        <select
          name="repeat"
          id="repeat"
          className={styles.designForm__select}
          value={formData.repeat}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="tile">Tile</option>
          <option value="half-drop">Half Drop</option>
        </select>
      </form>
      <Cta
        ctaFunction={handleSaveDesign}
        dataTestId={dataTestIds.cta}
        label="Save Design"
        ariaLabel="save your design"
        type="button"
      />
    </div>
  );
}
