
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDetail, getEmployeeList } from "../../../store/employeeList";
import { useNavigate } from "react-router-dom";
import TemporaryDrawer from "./SideDrawer";

import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


const Company = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  console.log(employees)
  const status = useSelector((state) => state.employee.status);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleRowClick = (employee) => {
    console.log('clicked',employee.id);
    dispatch(getEmployeeDetail(employee.id));
    navigate(`/employee/${employee.id}`);
  };

  useEffect(() => {
    dispatch(getEmployeeList());
  }, [dispatch]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };


  return (
    <>
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}

            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              H R M S
            </Typography>
            <Button color="inherit">logout</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <TemporaryDrawer open={drawerOpen} onClose={toggleDrawer(false)} />


      {status === "succeeded" ? (
        <Container>
        <Box sx={{ p: 7 }}>
        <Paper elevation={3} sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>
            Employee List
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sl. No</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone Number</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">Designation</TableCell>
                  <TableCell align="center">Leave Taken</TableCell>
                  <TableCell align="center">Leave Allotted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { employees.map((employee, index) => (
                  <TableRow key={employee.id} onClick={() => handleRowClick(employee)} style={{ cursor: 'pointer' }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{`${employee.first_name} ${employee.last_name}`}</TableCell>
                    <TableCell align="center">{employee.email}</TableCell>
                    <TableCell align="center">{employee.phone_no}</TableCell>
                    <TableCell align="center">{employee.address}</TableCell>
                    <TableCell align="center">{employee.designation}</TableCell>
                    <TableCell align="center">{employee.leave_taken}</TableCell>
                    <TableCell align="center">{employee.leave_allotted}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      </Container>
      ) : status === "pending" ? (  
        <div>Loading...</div>
      ) : 
      null
      }
      
      </div>
    </>
  );
};

export default Company;


