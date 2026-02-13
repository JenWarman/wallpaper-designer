import { statusUpdates } from "./statusUpdates";

export function createToastMessage(status: string) {
    const entry = Object.entries(statusUpdates).find(([key]) => key === status)
    return entry ? entry[1].update : undefined
  };

