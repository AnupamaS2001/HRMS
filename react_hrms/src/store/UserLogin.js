

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "pending",
    user: null,
    error: null
};

export const UserLogin = createAsyncThunk(
    "user/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL}/login`,  username, password )     
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const userSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UserLogin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.error = null;
            })
            .addCase(UserLogin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;