import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDesignationList } from "../../../store/designation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import SideDrawer from "../EmployeeList/SideDrawer";
import Navbar from "../EmployeeList/navbar";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const position = useSelector((state) => state.designation.designation.data);

  const status = useSelector((state) => state.designation.status);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(getDesignationList());
  }, [dispatch]);
console.log(position,"positionnnnn");
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleUpdate = (id) => {
    navigate(`/designation/update/${id}`);
  };

  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} />
      <div>
        <SideDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
        {status === "pending" ? (
          <div>Loading...</div>
        ) : (
          <Box sx={{ p: 7 }}>
            <Paper elevation={3} sx={{ marginBottom: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ padding: 2 }} align="center">
                DESIGNATION 
              </Typography>
              <TableContainer component={Paper} sx={{ border: 1, borderColor: 'grey.400' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ borderRight: 1, borderColor: 'grey.400' }}>Name</TableCell>
                      <TableCell align="center" sx={{ borderRight: 1, borderColor: 'grey.400' }}>Leave Allotted</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(position) && position.map((des) => (
                      <TableRow key={des.id}>
                        <TableCell align="center" sx={{ borderRight: 1, borderColor: 'grey.400' }}>{des.name}</TableCell>
                        <TableCell align="center" sx={{ borderRight: 1, borderColor: 'grey.400' }}>{des.leave_allotted}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="primary" onClick={() => handleUpdate(des.id)}>
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        )}
      </div>
    </>
  );
};

export default Company;
