// import { useDispatch, } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addDesignation } from "../../../store/designation";
// import { useState } from "react";



// const DesignationAdd = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [errorMessage, setErrorMsg] = useState(null);
//     const [designation, setDesignation] = useState({
//       name: '',
//       leave_allotted: '',
//     });
//     const success = () => {
//       navigate('/designation/all');
//       setErrorMsg(null);
//     };
  
//     const errorHandle = (error) => {
//       setErrorMsg(error);
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       dispatch(addDesignation({ designationData: designation, successCb: success, errorCb: errorHandle }));
//     };
  
//     const handleInputChange = (event) => {
//       const { name, value } = event.target;
//       setDesignation({
//         ...designation,
//         [name]: value,
//       });
//     };
  
//     return (
//       <div>
//         <h2>Add Designation</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={designation.name}
//                 onChange={handleInputChange}
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Leave Allotted:
//               <input
//                 type="text"
//                 name="leave_allotted"
//                 value={designation.leave_allotted}
//                 onChange={handleInputChange}
//               />
//             </label>    
//           </div>                
//           <button type="submit">Submit</button>
//         </form>
//         {errorMessage && <p>{errorMessage}</p>}     
//       </div>
//     );  
//   };        
//   export default DesignationAdd;

//=================================================================================================================


import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDesignation } from "../../../store/designation";
import { useState } from "react";
import { Box, FormControl, Button, Modal, Typography, TextField } from "@mui/material";

const DesignationAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMsg] = useState(null);
  const [designation, setDesignation] = useState({
    name: '',
    leave_allotted: '',
  });
  const [modalOpen, setModalOpen] = useState(true);

  const success = () => {
    navigate('/designation/all');
    setErrorMsg(null);
  };

  const errorHandle = (error) => {
    setErrorMsg(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDesignation({ designationData: designation, successCb: success, errorCb: errorHandle }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDesignation({
      ...designation,
      [name]: value,
    });
  };

  const handleClose = () => setModalOpen(false);


  return (
    <Box>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="add-designation-title"
        aria-describedby="add-designation-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="add-designation-title" variant="h6" component="h2">
            Add Designation
          </Typography>
          <FormControl component="form" sx={{ mt: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={designation.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Leave Allotted"
              name="leave_allotted"
              value={designation.leave_allotted}
              onChange={handleInputChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
              Add
            </Button>
          </FormControl>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </Box>
      </Modal>
    </Box>
  );
};

export default DesignationAdd;
