import { createAsyncThunk , createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


const intialState = {
    status: "pending",
    leave: {},  
    error: null,
  };
  

// export const addLeave = createAsyncThunk(
//     'leave/add',
//     async (employee_id) => {
//         console.log( "entereddddddddddddddddddddd");
//       return addEmployeeLeave(employee_id)
//         .then((response) => {
//           console.log(response.data, "response_________________");
//           return response.data;
//         })
//         .catch((error) => {
//           throw error;
//         });
//     }
//   )

  export const addLeave = createAsyncThunk(
    'leave/add',
    async (id) => {
      const response = await axios.post(`${import.meta.env.VITE_URL}/leave/add/${id}`);
      console.log('res',response.data);
      return response.data;
    }
  );

  const LeaveSlice = createSlice({
    name: "leave",
    initialState: intialState,
    reducers: {
      resetLeaveState: (state) => {
        state.leave = {};
        state.status = "pending";
        state.error = null;
      }
    },    extraReducers: (builder) => {
      builder
        .addCase(addLeave.pending, (state) => {
          state.status = "loading";
        })
        .addCase(addLeave.fulfilled, (state, action) => {
          state.status = "succeeded";
          console.log("payloadddddddddd", action.payload.message)
          state.leave = action.payload;
        })
        .addCase(addLeave.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });

  export const { resetLeaveState } = LeaveSlice.actions;
  

export default LeaveSlice.reducer;