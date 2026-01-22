import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Design {
  theme: string;
  motif: string;
  scale: string;
  colour: string;
  repeat: string;
}
const initialState: Design[] = [];

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    saveDesign: (state, action: PayloadAction<Design>) => {
      state.push(action.payload);
    },
  },
});

export const { saveDesign } = designSlice.actions;
export default designSlice.reducer;
