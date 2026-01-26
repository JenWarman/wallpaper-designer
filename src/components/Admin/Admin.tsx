import { useState } from "react";
import styles from "./Admin.module.scss";
import { updateProgressStatus } from "../../supabase/supabase";
import { Input } from "../Input/Input";
import { dataTestIds } from "../../utils/dataTestIds";
import { DropDown } from "../DropDown/DropDown";
import { Cta } from "../Cta/Cta";

export function Admin() {
  const [designUrl, setDesignUrl] = useState(
    "theme=floral&motif=daisy&colour=blue&scale=large&repeat=tile",
  );
  const [status, setStatus] = useState("ordered");

  const handleStatusUpdate = async () => {
    await updateProgressStatus(designUrl, status);
    alert(`Order Status updated: ${status}`);
  };

  return (
    <div className={styles.admin__container}>
      <h1 className={styles.admin__header}>Admin Status Update</h1>
      <Input
        id={designUrl}
        ariaLabel="enter design url"
        type="text"
        name={designUrl}
        label="Enter Design URL"
        onChange={(event) => setDesignUrl(event.target.value)}
        dataTestId={dataTestIds.input}
      />
      <div className={styles.admin__dropdown}>
        <DropDown
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          ariaLabel="Select a progress status"
          options={["ordered", "production", "packing", "shipped", "received"]}
        />
        <Cta
          type="button"
          ctaFunction={handleStatusUpdate}
          label="Update"
          ariaLabel="update status"
          dataTestId={dataTestIds.cta}
        />
      </div>
    </div>
  );
}
