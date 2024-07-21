
import { useState ,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { addEmployee } from '../../../store/employeeAdd';
import { getDesignation } from '../../../api/designation';
import { MenuItem, Select ,FormControl} from '@mui/material';


const EmployeeAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMsg] = useState(null);
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    phone_no: '',
    email: '',
    address: '',
    designation_id: '',
    
  });
  const [open, setOpen] = useState(true); // State for modal
  const [designations, setDesignations] = useState([]);  // State to store designations

  useEffect(() => {
    const getDesignations = async () => {
      try {
        const designationsData = await getDesignation();
        setDesignations(designationsData.data);
        console.log(designationsData,"gfjhbkufdutrfdkuhg");
      } catch (error) {
        console.error('Error fetching designations:', error);
      }
    };

    getDesignations();
  }, []);

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    navigate('/employee/all');
    handleClose();
  }
  const success = () => {
    navigate('/employee/all');
    setErrorMsg(null);
    handleClose();
  };

  const errorHandle = (error) => {
    setErrorMsg(error);
  };

  const handleSubmit = (e) => {
    console.log("guhuygyug");
    e.preventDefault();
    if(employee.designation_id === "" || employee.first_name === "" || employee.last_name === "" || employee.phone_no === "" || employee.email === "" || employee.address === "") {
      setErrorMsg("Please fill all the fields");
      throw Error("Please fill all the fields");
    }
    dispatch(addEmployee({ employeeData: employee, successCb: success, errorCb: errorHandle }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal open={open} onClose={handleCancel}>
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            backgroundColor: 'background.paper',
            boxShadow: 24,
            p: 4,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Employee
          </Typography>
          <FormControl>
            <TextField
              id="first_name"
              name="first_name"
              label="First Name"
              variant="outlined"
              required
              value={employee.first_name}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              id="last_name"
              name="last_name"
              label="Last Name"
              variant="outlined"
              value={employee.last_name}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              id="phone_no"
              name="phone_no"
              label="Phone Number"
              variant="outlined"
              value={employee.phone_no}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={employee.email}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              value={employee.address}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
       
            {/* <TextField
              id="designation"
              name="designation"
              label="Designation Name"
              variant="outlined"
              value={employee.designation}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '1rem' }}
            /> */}

          


            <Select
              id="designation"
              name="designation_id"
              value={employee.designation_id}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Designation
              </MenuItem>
              {designations.map(designation => (
                <MenuItem key={designation.id} value={designation.id}>
                  {designation.name}
                </MenuItem>
              ))}
            </Select>

            <Button variant="contained" type="submit" fullWidth style={{ marginBottom: '1rem' }} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={handleCancel} fullWidth style={{ marginBottom: '1rem' }}>
              Cancel
            </Button>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeeAdd;
