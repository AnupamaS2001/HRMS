
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { postDesignation, putDesignation } from '../api/designation';

export const getDesignationList = createAsyncThunk(
  'Designation/list',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_URL}/designation/all`);
    return response.data;
  }
);

export const addDesignation = createAsyncThunk(
  'Designation/add',
  async ({ designationData, successCb, errorCb },{ rejectWithValue}) => {
    return postDesignation(designationData)
      .then(response => {
        if (successCb) successCb(response);
        return response;  

      })
      .catch(error => {
        if (errorCb) errorCb(error);
        return rejectWithValue(error.response?.data?.message || error.message);
      });
  }
);

export const updateDesignation = createAsyncThunk(
  'Designation/update',
  async ({formData, successCb, errorCb} ) => {
    return putDesignation(formData,successCb, errorCb)
      .then((response) => {
        successCb()
        return response?.data;
      })
      .catch((error) => {
        errorCb(error)
        throw error;
      });
  }
)

const designationSlice = createSlice({
  name: 'DesignationList',
  initialState: {
    designation: {},  
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
      })
      .addCase(addDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designation = action.payload;
      })
      .addCase(addDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designation.push(action.payload);
      })
      .addCase(updateDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });


  },
});

export default designationSlice.reducer;
