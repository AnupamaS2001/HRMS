// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import WorkIcon from '@mui/icons-material/Work';

// export default function TemporaryDrawer({ open, onClose }) {
//   const [designationOpen, setDesignationOpen] = React.useState(false);

//   const handleDesignationClick = () => {
//     setDesignationOpen(!designationOpen);
//   };
  

//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleDesignationClick}>
//             <ListItemIcon>
//               <WorkIcon />
//             </ListItemIcon>
//             <ListItemText primary="Designation" />
//           </ListItemButton>
//         </ListItem>
//         <Divider />
//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <PersonAddIcon />
//             </ListItemIcon>
//             <ListItemText primary="Add Employee" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//       <Divider />
//     </Box>
//   );

//   return (
//     <Drawer open={open} onClose={onClose}>
//       {DrawerList}
//     </Drawer>
//   );
// }



// ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import WorkIcon from '@mui/icons-material/Work';
// import { Link } from 'react-router-dom';

// export default function TemporaryDrawer({ open, onClose }) {
//   const [designationOpen, setDesignationOpen] = React.useState(false);

//   const handleDesignationClick = () => {
//     setDesignationOpen(!designationOpen);
//   };

//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleDesignationClick}>
//             <ListItemIcon>
//               <WorkIcon />
//             </ListItemIcon>
//             <ListItemText primary="Designation" />
//           </ListItemButton>
//         </ListItem>
//         <Divider />


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WorkIcon from '@mui/icons-material/Work';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer({ open, onClose }) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/designation/all">
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Designation" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/employee/add">
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Employee" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
}
