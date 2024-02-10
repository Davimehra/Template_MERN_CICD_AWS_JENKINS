import { createSlice } from "@reduxjs/toolkit"
import consoleLog from "../../hooks/consoleLog"
const logMessage = consoleLog();
const authInitial = {
    accessToken: ''
}

const authSlice = createSlice({
    initialState: authInitial,
    name: 'auth',
    reducers: {
        addToAuth: (state, action) => {
            logMessage("Auth State Changed ")
            return { ...state, accessToken: action?.payload?.accessToken }
        },
        removeFromAuth: (state, action) => {
            logMessage("Auth State Changed ")
            return { ...state, accessToken: '' }
        }
    }
})



export const { addToAuth, removeFromAuth } = authSlice.actions;
export default authSlice.reducer; 