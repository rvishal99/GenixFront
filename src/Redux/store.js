import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js"
import productsReducer from "./Slices/productsSlice.js"
import bidsReducer from "./Slices/bidsSlice.js"

const store = configureStore(
    {
        reducer: {
            auth: authSliceReducer,
            products: productsReducer,
            bids: bidsReducer,
        },
        devTools: true
    }
)
export default store;


