import { createDesignByUserId } from "../../supabase/supabase";
import type { FormDataType } from "../../types/types";
import { dataTestIds } from "../../utils/dataTestIds";
import { Cta } from "../Cta/Cta";
import { DropDown } from "../DropDown/DropDown";
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
      <form className={styles.designForm__form}>
        <DropDown label="theme" value={formData.theme} onChange={handleChange} ariaLabel="Select theme" options={["floral"]}/>
        <DropDown label="motif" value={formData.motif} onChange={handleChange} ariaLabel="Select motif" options={["Orchid", "Daisy", "Rose"]}/>
        <DropDown label="scale" value={formData.scale} onChange={handleChange} ariaLabel="Select scale" options={["Small", "Medium", "Large"]}/>
        <DropDown label="background-colour" value={formData["background-colour"]} onChange={handleChange} ariaLabel="Select background colour" options={["pink", "blue"]}/>
        <DropDown label="repeat" value={formData.repeat} onChange={handleChange} ariaLabel="Select repeat" options={["Tile", "Half Drop"]}/>
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
