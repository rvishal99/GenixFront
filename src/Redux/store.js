import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js"
import productsReducer from "./Slices/productsSlice.js"

const store = configureStore(
    {
        reducer: {
            auth: authSliceReducer,
            products: productsReducer,
        },
        devTools: true
    }
)
export default store;


