// // import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, TextField, Typography } from "@mui/material";


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// import {
// //   Typography,
// //   Divider,
// //   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// // import { Email, Phone, Home } from "@mui/icons-material";
// // import vCardsJS from "vcards-js";
// // import { saveAs } from "file-saver";
// // import QRCode from "react-qr-code";
// // import { addEmployeeLeave } from "../../../api/leave";
// import { getEmployeeDetail, updateEmployee } from "../../../store/employeeList";

// import SideDrawer from "../EmployeeList/SideDrawer";
// import Navbar from "../EmployeeList/navbar";
// // import { deleteEmployee } from "../../../api/deleteEmployee";



// const EmployeeUpdate = () => {
//     const dispatch = useDispatch();
//     // const navigate = useNavigate();
//     const employee_detail = useSelector((state) => state.employee.employee_detail);
//     // const [vCardString, setVCardString] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//       first_name: "",
//       last_name: "",
//       email: "",
//       phone_no: "",
//       address: "",
//     });
  
//     useEffect(() => {
//       if (employee_detail) {
//         setFormData({
//           id: employee_detail.id,
//           first_name: employee_detail.first_name,
//           last_name: employee_detail.last_name,
//           email: employee_detail.email,
//           phone_no: employee_detail.phone_no,
//           address: employee_detail.address,
//           designation_id: employee_detail.designation_id,
//         });
//         // const vCard = vCardsJS();
//         // vCard.firstName = employee_detail?.first_name;
//         // vCard.lastName = employee_detail?.last_name;
//         // vCard.organization = employee_detail?.organization || "Hamon Technologies";
//         // vCard.workPhone = employee_detail?.phone_no;
//         // vCard.email = employee_detail?.email;
//         // vCard.address = employee_detail?.address;
//         // vCard.title = employee_detail?.designation;
//         // const vCardString = vCard.getFormattedString();
//         // setVCardString(vCardString);
//       }
//     }, [employee_detail]);
  
//     // const handleClickOpen = () => {
//     //   setOpen(true);
//     // };
  
  
//     const handleSave = () => {
//       dispatch(updateEmployee({ employeeData: formData }))
//         .unwrap() // This will return a promise that can be used to chain the next dispatch
//         .then(() => {
//           dispatch(getEmployeeDetail(employee_detail.id));
//           setOpen(false);
//         })
//         .catch((error) => {
//           console.error("Update failed:", error);
//           setSuccessMessage("Failed to update employee details");
//         });
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//     // const handleSuccess = () => {
//     //   setSuccessMessage("leave added");
//     // };
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     };
  
//     const toggleDrawer = (open) => (event) => {
//       if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//         return;
//       }
//       setDrawerOpen(open);
//     };
  
  
  
//     // const generateVCard = () => {
      
  
//     //   const blob = new Blob([vCardString], { type: "text/vcard" });
//     //   saveAs(blob, "contact.vcf");
//     // };
  
//     return (
//       <>
//         <Navbar toggleDrawer={toggleDrawer} />
//   <div>

//   <SideDrawer open={drawerOpen} onClose={toggleDrawer(false)} />

// <Dialog open={open} onClose={handleClose}>
// <DialogTitle>Update Employee Details</DialogTitle>
// <DialogContent>
//   <DialogContentText>
//     Update the details of the employee here.
//   </DialogContentText>
//   <TextField
//     autoFocus
//     margin="dense"
//     id="first_name"
//     name="first_name"
//     label="First Name"
//     type="text"
//     fullWidth
//     variant="standard"
//     value={formData.first_name}
//     onChange={handleChange}
//   />
//   <TextField
//     margin="dense"
//     id="last_name"
//     name="last_name"
//     label="Last Name"
//     type="text"
//     fullWidth
//     variant="standard"
//     value={formData.last_name}
//     onChange={handleChange}
//   />
//   <TextField
//     margin="dense"
//     id="email"
//     name="email"
//     label="Email Address"
//     type="email"
//     fullWidth
//     variant="standard"
//     value={formData.email}
//     onChange={handleChange}
//   />
//   <TextField
//     margin="dense"
//     id="phone_no"
//     name="phone_no"
//     label="Phone Number"
//     type="text"
//     fullWidth
//     variant="standard"
//     value={formData.phone_no}
//     onChange={handleChange}
//   />
//   <TextField
//     margin="dense"
//     id="address"
//     name="address"
//     label="Address"
//     type="text"
//     fullWidth
//     variant="standard"
//     value={formData.address}
//     onChange={handleChange}
//   />
//   {/* Add more fields as necessary */}
// </DialogContent>
// <DialogActions>
//   <Button onClick={handleClose}>Cancel</Button>
//   <Button onClick={handleSave}>Save</Button>
// </DialogActions>
// </Dialog>
// {/* <Divider sx={{ my: 2 }} />
// <Box sx={{ mt: 2 }}>
// <Typography variant="h6" gutterBottom>
//   <Button variant="contained" color="primary" type="submit"
//     onClick={() => {addEmployeeLeave(employee_detail?.id);
//       handleSuccess();

//     }}
//     >
//     ADD LEAVE
//   </Button>
// </Typography>
// {successMessage && (
//   <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
//     {successMessage}
//   </Typography>)}
// </Box> */}

// {/* <Box sx={{ mt: 2 }}>
// <Button variant="contained" color="primary" onClick={generateVCard}>
//   Download vCard
// </Button>
// <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//   Scan this QR Code to get the contact details:
// </Typography> */}
// {/* {vCardString && (
//   <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//     <QRCode value={vCardString} size={256} />
//   </Box>
// )} */}
// {/* </Box> */}
// </div>

// </>

//     );
//   }

//   export default EmployeeUpdate;