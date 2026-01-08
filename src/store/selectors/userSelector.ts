import type { RootState } from "../store";

export const getUserId = (state: RootState) => state.user.userAccount.user_id;

export const getUsername = (state: RootState) => state.user.userAccount.username;

export const getOrderPlaced = (state: RootState) => state.order.orderPlaced