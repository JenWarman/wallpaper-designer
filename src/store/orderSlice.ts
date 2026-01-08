import { createSlice } from "@reduxjs/toolkit";

interface OrderActions {
    priceCalculated: boolean,
    orderPlaced: boolean 
}

const initialState: OrderActions = {
    priceCalculated: false,
    orderPlaced: false
}
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderPlaced: (state) => {
            state.orderPlaced = !state.orderPlaced
        }
    }
})

export const { orderPlaced} = orderSlice.actions

export default orderSlice.reducer