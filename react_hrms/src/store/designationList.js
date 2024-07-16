
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDesignationList = createAsyncThunk(
  'Designation/list',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_URL}/designation/all`);
    return response.data;
  }
);

const designationListSlice = createSlice({
  name: 'DesignationList',
  initialState: {
    designation: [],  
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDesignationList.pending, (state) => {
        console.log('action');
        
        state.status = 'pending';
      })
      .addCase(getDesignationList.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.designation = action.payload;
      })
      .addCase(getDesignationList.rejected, (state, action) => {
        console.log('action');

        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default designationListSlice.reducer;
