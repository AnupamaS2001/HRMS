
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css'

import Home from './pages/components/Home';
import LogIn from './pages/components/LogIn';
import EmployeeAdd from './pages/components/AddEmployee';
import EmployeeList from './pages/components/EmployeeList';
import EmployeeDetail from './pages/components/EmployeeList/EmployeeDetail';
import LogOut from './pages/components/LogOut';
import DesignationAdd from './pages/components/DesignationList/designationAdd';
import DesignationList from './pages/components/DesignationList';
import DesignationUpdate from './pages/components/DesignationList/designationUpdate';
function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/employee/add' element={<EmployeeAdd/>}/>
          <Route path='/employee/all' element={<EmployeeList/>}/>
          <Route path='/employee/:id' element={<EmployeeDetail/>}/>
          <Route path='/designation/add' element={<DesignationAdd/>}/>
          <Route path='/designation/all' element={<DesignationList/>}/>
          <Route path='/designation/update/:id' element={<DesignationUpdate/>}/>
          <Route path='/logout' element={<LogOut/>}/>

        </Routes>
      </Router>
  );
}

export default App;
