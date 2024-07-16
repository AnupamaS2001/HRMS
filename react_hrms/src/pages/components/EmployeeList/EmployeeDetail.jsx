
import { useState } from "react";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import { Email, Phone, Home } from "@mui/icons-material";
import vCardsJS from "vcards-js";
import { saveAs } from "file-saver";
import QRCode from "react-qr-code";
import { addEmployeeLeave } from "../../../api/leave";
import UpdateEmployeeDetail from "../../components/UpdateEmployee";

const EmployeeDetail = () => {
  const employee_detail = useSelector((state) => state.employee.employee_detail,);
  const [vCardString, setVCardString] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSuccess = () => {
    setSuccessMessage("leave added");
  };

  const generateVCard = () => {
    const vCard = vCardsJS();
    vCard.firstName = employee_detail?.first_name;
    vCard.lastName = employee_detail?.last_name;
    vCard.organization = employee_detail?.organization || "Hamon Technologies";
    vCard.workPhone = employee_detail?.phone_no;
    vCard.email = employee_detail?.email;
    vCard.address = employee_detail?.address;
    vCard.title = employee_detail?.designation;
    const vCardString = vCard.getFormattedString();
    setVCardString(vCardString);

    const blob = new Blob([vCardString], { type: "text/vcard" });
    saveAs(blob, "contact.vcf");
  };

  return (

    <Container maxWidth="xl" sx={{ mt:0 , ml:-30 , mr:90}} position="center" alignItems="center" justifyContent="center"> 
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {employee_detail?.first_name} {employee_detail?.last_name}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {employee_detail?.name}
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
              {/* <ListItem>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary={employee_detail?.organization} />
              </ListItem> */}
            </List>
          </Grid>
        </Grid>
        <UpdateEmployeeDetail/>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            <Button variant="contained" color="primary" type="submit"
              onClick={() => {addEmployeeLeave(employee_detail?.id);
                handleSuccess();

              }}
              >
              ADD LEAVE
            </Button>
          </Typography>
          {successMessage && (
            <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
              {successMessage}
            </Typography>)}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={generateVCard}>
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
  );
};

export default EmployeeDetail;
