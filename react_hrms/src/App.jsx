
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css'
// import Vcf from './pages/Vcf';
import Home from './pages/Home';
import LogIn from './pages/components/LogIn';
import EmployeeAdd from './pages/components/AddEmployee';
import EmployeeList from './pages/components/EmployeeList';
import DesignationList from './pages/components/DesignationList';
import EmployeeDetail from './pages/components/EmployeeList/EmployeeDetail';
import UpdateEmployeeDetail from './pages/components/UpdateEmployee';
function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/employee/add' element={<EmployeeAdd/>}/>
          <Route path='/employee/all' element={<EmployeeList/>}/>
          <Route path='/employee/:id' element={<EmployeeDetail/>}/>
          <Route path='/designation/all' element={<DesignationList/>}/>
          <Route path='/employee/update/:id' element={<UpdateEmployeeDetail/>}/>

        </Routes>
      </Router>
  );
}

export default App;
