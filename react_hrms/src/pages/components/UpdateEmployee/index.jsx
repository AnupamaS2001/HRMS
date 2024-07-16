import { useEffect, useState, useNavigate } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../../../store/employeeList";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getEmployeeDetail } from "../../../store/employeeList";

const UpdateEmployeeDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeeData = useSelector((state) => state.employee.employee_detail);

  console.log("emp_data:", employeeData);
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    email: "",
    address: "",
    designation_id: "",
  });

  useEffect(() => {
    setEmployee(employeeData);
  }, [employeeData]);

  const [open, setOpen] = useState(true); // State for modal

  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    navigate("/employee/all");
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployee({ employeeData: employee }));
  };

  useEffect(() => {
    dispatch(getEmployeeDetail(employeeData.id));
    setEmployee(employeeData);
  }, [employeeData, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            width: 400,
            backgroundColor: "background.paper",
            boxShadow: 24,
            p: 4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Employee
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="first_name"
              name="first_name"
              label="First Name"
              variant="outlined"
              value={employee.first_name}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              id="last_name"
              name="last_name"
              label="Last Name"
              variant="outlined"
              value={employee.last_name}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              id="phone_no"
              name="phone_no"
              label="Phone Number"
              variant="outlined"
              value={employee.phone_no}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "1rem" }}
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
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              value={employee.address}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
            /
            <TextField
              id="designation_id"
              name="designation_id"
              label="Designation ID"
              variant="outlined"
              value={employee.designation_id}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "1rem" }}
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
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{ marginBottom: "1rem" }}
            >
              Submit
            </Button>
            <Button
              onClick={handleCancel}
              fullWidth
              style={{ marginBottom: "1rem" }}
            >
              Cancel
            </Button>
            {/* {errorMessage && <Typography color="error">{errorMessage}</Typography>}  */}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateEmployeeDetail;
