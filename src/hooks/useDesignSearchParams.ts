import { useSearchParams } from "react-router-dom";
import type { FormDataType } from "../types/types";

export default function useDesignSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const formData: FormDataType = {
    theme: searchParams.get("theme") ?? "",
    motif: searchParams.get("motif") ?? "",
    scale: searchParams.get("scale") ?? "",
    "background-colour": searchParams.get("background-colour") ?? "",
    repeat: searchParams.get("repeat") ?? "",
  };

  const updateParam = (name: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value === "") {
      nextParams.delete(name);
    } else {
      nextParams.set(name, value);
    }

    setSearchParams(nextParams);
  };

  const clearParams = () => setSearchParams({})

  const paramsString = searchParams.toString()
  
  return {
    formData,
    paramsString,
    updateParam,
    clearParams
  };
}


