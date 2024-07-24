import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeDetail,
  getEmployeeList,
} from "../../../store/employeeList";
import SideDrawer from "./SideDrawer";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import Navbar from "./navbar";
import EmployeeDetail from "./EmployeeDetail";

const Company = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const employee_detail = useSelector((state) => state.employee.employeeDetail);

  console.log(employees);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});


  const handleRowClick = (id) => {
    if(id){
      dispatch(getEmployeeDetail(id));
    }
    
  };

  useEffect(() => {
    setSelectedEmployee(employee_detail);
  },[employee_detail])

  useEffect(() => {
    dispatch(getEmployeeList());
  }, [dispatch]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  console.log(selectedEmployee);

  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} />
      <div>
        <SideDrawer open={drawerOpen} onClose={toggleDrawer(false)} />

        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item xs={6}>
              <Box sx={{ p: 7 }}>
                <Paper elevation={3} sx={{ marginBottom: 4 }}>
                  <Typography
                    align="center"
                    variant="h6"
                    gutterBottom
                    sx={{ padding: 2 }}
                  >
                    <h4>Employee List</h4>
                    <p>No.of employees : {employees.length}</p> 
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Sl. No</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {employees.length > 0 ? (
                          <>
                            {employees.map((employee, index) => (
                              <TableRow
                                key={employee.id}
                                onClick={() => handleRowClick(employee.id)}
                                style={{ cursor: "pointer" }}
                                hover={true}
                               
                              >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{`${employee.first_name} ${employee.last_name}`}</TableCell>
                                <TableCell align="center">
                                  {employee.email}
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        ) : (
                          <>No Data</>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={6}>
<Box>
    {selectedEmployee.id && <EmployeeDetail employee={selectedEmployee} />}
</Box>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Company;
