import { createDesignByUserId } from "../../supabase/supabase";
import { dataTestIds } from "../../utils/dataTestIds";
import { Cta } from "../Cta/Cta";
import { DropDown } from "../DropDown/DropDown";
import styles from "./DesignForm.module.scss";
import useDesignSearchParams from "../../hooks/useDesignSearchParams";

export function DesignForm() {
  const {formData,
    searchParams,
    updateParam,
    clearParams } = useDesignSearchParams()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateParam(event.target.name, event.target.value)
  }

  const handleSaveDesign = async () => {
    await createDesignByUserId(searchParams.toString());
  };

  return (
    <div
      className={styles.designForm__container}
      data-testid={dataTestIds.designForm}
    >
      <form className={styles.designForm__form}>
        <DropDown
          label="theme"
          value={formData.theme}
          onChange={handleChange}
          ariaLabel="Select theme"
          options={["floral"]}
        />
        <DropDown
          label="motif"
          value={formData.motif}
          onChange={handleChange}
          ariaLabel="Select motif"
          options={["orchid", "daisy", "rose"]}
        />
        <DropDown
          label="scale"
          value={formData.scale}
          onChange={handleChange}
          ariaLabel="Select scale"
          options={["small", "medium", "large"]}
        />
        <DropDown
          label="background-colour"
          value={formData["background-colour"]}
          onChange={handleChange}
          ariaLabel="Select background colour"
          options={["pink", "blue"]}
        />
        <DropDown
          label="repeat"
          value={formData.repeat}
          onChange={handleChange}
          ariaLabel="Select repeat"
          options={["tile", "half drop"]}
        />
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
        <Cta
          ctaFunction={clearParams}
          dataTestId={dataTestIds.cta}
          label="Cancel"
          ariaLabel="cancel and clear form."
          type="button"
        />
      </div>
    </div>
  );
}
