import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for placing a bid
export const placeBid = createAsyncThunk('bids/placeBid', async ({ productId, amount, user }) => {
    const response = await axios.post(`/api/products/${productId}/bid`, { amount, user });
    return { productId, bid: response.data };
});

const bidsSlice = createSlice({
    name: 'bids',
    initialState: {
        bids: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addBid: (state, action) => {
            state.bids.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeBid.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(placeBid.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bids.push(action.payload.bid);
            })
            .addCase(placeBid.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addBid } = bidsSlice.actions;
export default bidsSlice.reducer;
