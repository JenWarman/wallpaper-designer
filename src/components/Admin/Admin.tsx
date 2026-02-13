import { useState } from "react";
import styles from "./Admin.module.scss";
import { insertProgressStatus } from "../../supabase/supabase";
import { dataTestIds } from "../../utils/dataTestIds";
import { DropDown } from "../DropDown/DropDown";
import { Cta } from "../Cta/Cta";
import useStatusToSearchDesigns from "../../hooks/useStatusToSearchDesigns";

export function Admin() {
  const [selectedDesignUrl, setSelectedDesignUrl] = useState("");
  const [status, setStatus] = useState("production");
  const [refreshKey, setRefreshKey] = useState(0)

  const { filteredDesigns: orderedDesigns } = useStatusToSearchDesigns(
    "ordered",
    refreshKey,
  );

  const orderOptions = orderedDesigns.map((design) => design.design_url);

  const handleStatusUpdate = async () => {
    await insertProgressStatus(selectedDesignUrl, status);
    alert(`Order Status updated: ${status}`);
    setRefreshKey((key) => key + 1)
    setSelectedDesignUrl("")
  };

  return (
    <div className={styles.admin__container} data-testid={dataTestIds.admin}>
      <h1 className={styles.admin__header}>Admin Status Update</h1>
      <DropDown
          label="Order"
          value={selectedDesignUrl}
          onChange={(event) => setSelectedDesignUrl(event.target.value)}
          ariaLabel="Select an order"
          options={orderOptions}
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
