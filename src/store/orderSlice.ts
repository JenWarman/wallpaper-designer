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
        priceCalculated: (state) => {
            state.priceCalculated = !state.priceCalculated
            // console.log(state.priceCalculated)
        },
        orderPlaced: (state) => {
            state.orderPlaced = !state.orderPlaced
            // console.log(state.orderPlaced)
        }
    }
})

export const { orderPlaced, priceCalculated} = orderSlice.actions

export default orderSlice.reducer