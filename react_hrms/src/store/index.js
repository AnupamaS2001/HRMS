import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../store/UserLogin';
import employeeReducer from './employeeList';
import employeeAddReducer from './employeeAdd';
import designationReducer from './designation';
import leaveReducer from './leave';
const store = configureStore({
    reducer: {
        login: loginReducer,
        employee: employeeReducer,
        employeeAdd: employeeAddReducer,
        designation: designationReducer,
        leave: leaveReducer
    },
  })

  export default store