
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { putEmployee } from '../api/listEmployee';

export const getEmployeeList = createAsyncThunk(
  'employee/getEmployeeList',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_URL}/employee/all`);
    return response.data.data;
  }
);

export const getEmployeeDetail = createAsyncThunk(
  'employee/getEmployeeDetail',
  async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_URL}/employee/${id}`);
    console.log(response.data);
    return response.data;
  }
);

// export const updateEmployee = createAsyncThunk(
//   'employee/updateEmployee',
//   async (id) => {
//     const response = await axios.put(`${import.meta.env.VITE_URL}/employee/update/${id}`);
//     return response.data;
//   }
// );



export const updateEmployee = createAsyncThunk(
  'employee/add',
  async ({ employeeData, successCb, errorCb }, { rejectWithValue }) => {
    return putEmployee(employeeData)
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






// export const addEmployeeLeave = createAsyncThunk(
//   'employee/addEmployeeLeave',
//   async (id) => {
//     console.log('fdddddddddd');
//     const response = await axios.post(`${import.meta.env.VITE_URL}/leave/add/${id}`);
//     // const response = await axios.post(`${import.meta.env.VITE_URL}/leave/add/${id}`);
//     console.log(response.data);
//     return response.data;
//   }
// );



const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],  
    employeeDetail: {},  
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeList.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(getEmployeeList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getEmployeeDetail.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getEmployeeDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employeeDetail = action.payload;
      })
      .addCase(getEmployeeDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employeeDetail = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});

export default employeeSlice.reducer;
