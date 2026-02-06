import { useEffect, useState } from "react";
import {
  fetchDesignsByUserId,
  fetchProgressStatusByUserId,
} from "../supabase/supabase";
import { type SavedDesign } from "../types/types";

export default function useStatusToSearchDesigns(
  progressStatus: string,
  refreshTrigger: any,
) {
  const [filteredDesigns, setFilteredDesigns] = useState<SavedDesign[]>([]);

  useEffect(() => {
    (async () => {
      const designData = await fetchDesignsByUserId();
      const statusData = await fetchProgressStatusByUserId();

      const designs = designData?.data ?? [];
      const statuses = statusData?.status ?? [];

      const designMap = new Map(
        designs.map((design) => [design.design_url, design]),
      );

      const filtered = statuses
        .filter((status) => status.status === progressStatus)
        .map((s) => {
          const design = designMap.get(s.design);

          if (!design) return null;

          return {
            design_url: s.design,
            created_at: design.created_at,
          };
        })
        .filter(Boolean) as SavedDesign[];
      setFilteredDesigns(filtered);
    })();
  }, [progressStatus, refreshTrigger]);
  return { filteredDesigns };
}
