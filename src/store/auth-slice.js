import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const initialAuthState = {
    user: null,
    myCookie: cookies.get("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        logout(state) {
            cookies.remove("token");
            state.user = null;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
