import { useEffect } from "react";
import { useToast } from "./useToast";
import supabase from "../supabase/supabaseClient";
import type { ProgressStatusRow } from "../types/types";
import { createToastMessage } from "../utils/createToastMessage";

export function useOrderStatusListener(userId: string) {
    const { showToast } = useToast()

    useEffect(() => {
        if (!userId) return;

        const channel = supabase.channel("order-status-changes")
        .on("postgres_changes", {
            event: "*",
            schema: "public",
            table: "progressStatus",
            filter: `user_id=eq.${userId}`
        },
        (payload) => {
            const oldStatus = payload.old as ProgressStatusRow | null;
            const newStatus = payload.new as ProgressStatusRow | null;

            if (oldStatus !== newStatus) {
                const message = createToastMessage(newStatus?.status)
                showToast(message)
            }
        }
    ).subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
    }, [userId, showToast])
}