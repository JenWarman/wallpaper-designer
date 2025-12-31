import { createSlice } from "@reduxjs/toolkit";

type UserAccount = {
    user_id: string, 
    username: string
}
interface User {
    userAccount: UserAccount
}

const initialState: User = {
    userAccount: {user_id: "", username: ""}
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            console.log(action.payload)
            return action.payload
        }
    }
})

export const {saveUser} = userSlice.actions
export default userSlice.reducer