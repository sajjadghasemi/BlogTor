import { configureStore } from "@reduxjs/toolkit";
import authSliceReduser from "./auth-slice";

const store = configureStore({
    reducer: { auth: authSliceReduser },
});

export default store;
