import type { DesignData } from "../types/types";

export function parseDesignUrl(design_url: string): DesignData {
    const params = new URLSearchParams(design_url)
 
    return {
    theme: params.get("theme")?.replace(/\+/g, " ") ?? "",
    motif: params.get("motif")?.replace(/\+/g, " ") ?? "",
    scale: params.get("scale")?.replace(/\+/g, " ") ?? "",
    colour: params.get("colour")?.replace(/\+/g, " ") ?? "",
    repeat: params.get("repeat")?.replace(/\+/g, " ") ?? "",
  };

   
}