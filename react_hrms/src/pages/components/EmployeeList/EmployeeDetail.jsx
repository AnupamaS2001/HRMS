import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { Email, Phone, Home } from "@mui/icons-material";
import vCardsJS from "vcards-js";
import { saveAs } from "file-saver";
import QRCode from "react-qr-code";
import {
  getEmployeeDetail,
  updateEmployee,
  getEmployeeList,
} from "../../../store/employeeList";
import { deleteEmployee } from "../../../api/deleteEmployee";
import { addLeave, resetLeaveState } from "../../../store/leave";
import { getDesignationList } from "../../../store/designation";

const EmployeeDetail = ({ employee }) => {//eslint-disable-line
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee_detail = useSelector((state) => state.employee.employeeDetail);
  const designations = useSelector(
    (state) => state.designation.designation.data ?? []
  );
  const leave = useSelector((state) => state.leave.leave);
  const [vCardString, setVCardString] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    address: "",
    designation: "",
    designation_id: "",
    leave_taken: "",
    leave_allotted: "",
  });

  useEffect(() => {
    dispatch(getDesignationList());
  }, [dispatch]);

  useEffect(() => {
    if (employee.id) {//eslint-disable-line
      dispatch(getEmployeeDetail(employee.id)); //eslint-disable-line
      dispatch(resetLeaveState());
    }
  }, [dispatch, employee.id]); //eslint-disable-line

  useEffect(() => {
    if (employee_detail) {
      setFormData({
        id: employee_detail.id,
        first_name: employee_detail.first_name,
        last_name: employee_detail.last_name,
        email: employee_detail.email,
        phone_no: employee_detail.phone_no,
        address: employee_detail.address,
        designation_id: employee_detail.designation_id,
        designation: employee_detail.designation,
        leave_taken: employee_detail.leave_taken,
        leave_allotted: employee_detail.leave_allotted,
      });

      const vCard = vCardsJS();
      vCard.firstName = employee_detail?.first_name;
      vCard.lastName = employee_detail?.last_name;
      vCard.organization =
        employee_detail?.organization || "Hamon Technologies";
      vCard.workPhone = employee_detail?.phone_no;
      vCard.email = employee_detail?.email;
      vCard.address = employee_detail?.address;
      vCard.title = employee_detail?.designation;
      const vCardString = vCard.getFormattedString();
      setVCardString(vCardString);
    }
  }, [employee_detail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = (id) => {
    dispatch(updateEmployee({ employeeData: formData }))
      .unwrap() // This will return a promise that can be used to chain the next dispatch
      .then(() => {
        dispatch(getEmployeeDetail(id));
        setOpen(false);
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLeave = () => {
    dispatch(addLeave(employee_detail?.id))
      .then(() => {
        dispatch(getEmployeeDetail(employee_detail.id));
      })
      .catch((error) => {
        console.error("Error adding leave:", error);
      });
  };

  const handleDelete = () => {
    deleteEmployee(
      employee_detail.id,
      (data) => {
        console.log("Delete successful:", data);
        dispatch(getEmployeeList()); // Refresh employee list
        navigate("/employee/all");
      },
      (error) => {
        console.error("Delete failed:", error);
      }
    );
  };

  const generateVCard = () => {
    const blob = new Blob([vCardString], { type: "text/vcard" });
    saveAs(blob, "contact.vcf");
  };

  return (
    <>
      <div>
        <Container
          maxWidth="sm"
          sx={{ mt: 0 }}
          position="center"
          alignItems="center"
          justifyContent="center"
        >
          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={2} sm={8}>
                <Typography variant="h4" gutterBottom>
                  {employee_detail?.first_name} {employee_detail?.last_name}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {employee_detail?.designation}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText primary={employee_detail?.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText primary={employee_detail?.phone_no} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary={employee_detail?.address} />
                  </ListItem>
                  <ListItem>
                    <Typography>Leave Taken :</Typography>
                    <ListItemText primary={employee_detail?.leave_taken} />
                  </ListItem>
                  <ListItem>
                    <Typography>Leave Allotted :</Typography>
                    <ListItemText primary={employee_detail?.leave_allotted} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                text-align="align-right"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Update Employee Details</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Update the details of the employee here.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="phone_no"
                  name="phone_no"
                  label="Phone Number"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formData.phone_no}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="address"
                  name="address"
                  label="Address"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formData.address}
                  onChange={handleChange}
                />

                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Designation
                </InputLabel>
                <NativeSelect
                  defaultValue={formData.designation_id}
                  inputProps={{
                    name: "designation_id",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleChange}
                >
                  {designations.map((designation) => (
                    <option key={designation.id} value={designation.id}>
                      {designation.name}
                    </option>
                  ))}
                </NativeSelect>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleSave(employee_detail?.id);
                    handleClose();
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleLeave}
                >
                  ADD LEAVE
                </Button>
              </Typography>
              {leave.status === "success" && (
                <Typography color="success.main" sx={{ mt: 2 }}>
                  {leave.message}
                </Typography>
              )}
              {leave.status === "error" && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {leave.message}
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={generateVCard}
              >
                Download vCard
              </Button>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Scan this QR Code to get the contact details:
              </Typography>
              {vCardString && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <QRCode value={vCardString} size={256} />
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default EmployeeDetail;
