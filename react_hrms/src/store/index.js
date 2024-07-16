import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../store/UserLogin';
import employeeReducer from './employeeList';
import employeeAddReducer from './employeeAdd';
import designationlistReducer from './designationList';

const store = configureStore({
    reducer: {
        login: loginReducer,
        employee: employeeReducer,
        employeeAdd: employeeAddReducer,
        designationList:designationlistReducer,
    },
  })

  export default store