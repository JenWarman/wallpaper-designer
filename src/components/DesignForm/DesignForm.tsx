import { createDesignByUserId } from "../../supabase/supabase";
import { dataTestIds } from "../../utils/dataTestIds";
import { Cta } from "../Cta/Cta";
import { DropDown } from "../DropDown/DropDown";
import styles from "./DesignForm.module.scss";
import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { useDispatch } from "react-redux";
import { saveDesign} from "../../store/designSlice";

export function DesignForm() {
  // const dispatch = useDispatch()
  const { formData, paramsString, updateParam, clearParams } =
    useDesignSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateParam(event.target.name, event.target.value);
  };

  // console.log(formData)

  const handleSaveDesign = async () => {
    await createDesignByUserId(paramsString, formData);
    // dispatch(saveDesign({
    //   theme: formData.theme,
    //   motif: formData.motif,
    //   scale: formData.scale,
    //   colour: formData["background-colour"],
    //   repeat: formData.repeat
    // }))
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
          disabled={!formData.theme}
        />
        
        <DropDown
          label="background-colour"
          value={formData["background-colour"]}
          onChange={handleChange}
          ariaLabel="Select background colour"
          options={["pink", "blue"]}
          disabled={!formData.motif}
        />
        <DropDown
          label="scale"
          value={formData.scale}
          onChange={handleChange}
          ariaLabel="Select scale"
          options={["small", "medium", "large"]}
          disabled={!formData["background-colour"]}
        />
        <DropDown
          label="repeat"
          value={formData.repeat}
          onChange={handleChange}
          ariaLabel="Select repeat"
          options={["tile", "half drop"]}
          disabled={!formData.scale}
        />
        <div className={styles.designForm__Ctas}>
          <Cta
          ctaFunction={handleSaveDesign}
          dataTestId={dataTestIds.cta}
          label="Save"
          ariaLabel="save your design"
          type="button"
          disabled={!paramsString}
        />
          <Cta
            ctaFunction={clearParams}
            dataTestId={dataTestIds.cta}
            label="Cancel"
            ariaLabel="cancel and clear form."
            type="button"
          />
        </div>
      </form>
      
    </div>
  );
}
