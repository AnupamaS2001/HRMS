import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postEmployee } from "../api/addEmployee";

const intialState = {
  status: "pending",
  employee: [],  
  error: null,
};


export const addEmployee = createAsyncThunk(
  'employee/add',
  async ({ employeeData, successCb, errorCb }, { rejectWithValue }) => {
    return postEmployee(employeeData)
      .then(response => {
        if (successCb) successCb(response);
        return response.data;
      })
      .catch(error => {
        if (errorCb) errorCb(error);
        return rejectWithValue(error.response?.data?.message || error.message);
      });
  }
);

const addEmployeeSlice = createSlice({
  name: "employee",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee= action.payload;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default addEmployeeSlice.reducer;
