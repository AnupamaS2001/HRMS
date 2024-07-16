// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDesignationList } from "../../../store/designationList";
// // import { useNavigate } from "react-router-dom";
// TemporaryDrawer
// import Typography from "@mui/material/Typography";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import TemporaryDrawer from "../EmployeeList/SideDrawer";

// const Company = () => {
//   const dispatch = useDispatch();
//   const position = useSelector((state) => state.designationList.designation);
//   const status = useSelector((state) => state.designationList.status);
//   // const navigate = useNavigate();

//   // const handleRowClick = (designation) => {
//   //   navigate(`/employee/${employee.id}`);
//   // };

//   useEffect(() => {
//     dispatch(getDesignationList());
//   }, [dispatch]);

//   return (
//     <>
//     <div>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static">
//           <TemporaryDrawer/>
//           <Toolbar>
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               H R M S
//             </Typography>
//             <Button color="inherit">logout</Button>
//           </Toolbar>
//         </AppBar>
//       </Box>
      
//       {status === "pending" ? (
//         <div>Loading...</div>
//       ) : (
//         <Box sx={{ p: 7 }}>
//           <Paper elevation={3} sx={{ marginBottom: 4 }}>
//             <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>
//               Employee List
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center">Name</TableCell>
//                     <TableCell align="center">Leave Allotted</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {Array.isArray(position) && position.map((des) => (
//                     // <TableRow key={employee.id} onClick={() => handleRowClick(employee)} style={{ cursor: 'pointer' }}>
//                       // <TableCell align="center">{index + 1}</TableCell>
//                       <TableRow key={des.id}>
//                       <TableCell align="center">{des.name} </TableCell>
//                       <TableCell align="center">{des.leave_allotted}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>

//       )}
//       </div>
//     </>
//   );
// };

// export default Company;






import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDesignationList } from "../../../store/designationList";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TemporaryDrawer from "../EmployeeList/SideDrawer";

const Company = () => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.designationList.designation);
  const status = useSelector((state) => state.designationList.status);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(getDesignationList());
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
              <Button color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>

        <TemporaryDrawer open={drawerOpen} onClose={toggleDrawer(false)} />

        {status === "pending" ? (
          <div>Loading...</div>
        ) : (
          <Box sx={{ p: 7 }}>
            <Paper elevation={3} sx={{ marginBottom: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>
               DESIGNATION
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Leave Allotted</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(position) && position.map((des) => (
                      <TableRow key={des.id}>
                        <TableCell align="center">{des.name}</TableCell>
                        <TableCell align="center">{des.leave_allotted}</TableCell>
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
