import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams  } from 'react-router-dom';
import { updateDesignation } from '../../../store/designation';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';

const DesignationUpdate =()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const designations=useSelector((state) => state.designation.designation.data);
  const designation = designations.find((d) => d.id === parseInt(id));
  console.log(designation);
  const [errorMessage, setErrorMsg] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    leave_allotted:"",
  });

  useEffect(() => {
    if (designation) {
      setFormData({
        id:designation.id ,
        name: designation.name ,
        leave_allotted: designation.leave_allotted ,
      });
    }
    setOpenModal(true)
  }, [designation]);

  const success = () => {
    navigate('/designation/all');
    setErrorMsg(null);
    handleClose();
  };

  const errorHandle = (error) => {
    setErrorMsg(error.message || 'Something went wrong');
  };

  const handleClose = () => {
    navigate('/designation/all');
    setOpenModal(false);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDesignation({formData:formData,successCb:success,errorCb:errorHandle}));
    console.log("submitted");
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>Update Designation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update the details of the designation here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="leave_allotted"
          name="leave_allotted"
          label="Leave Allotted"
          type="text"
          fullWidth
          variant="standard"
          value={formData.leave_allotted}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </Dialog>
  );
};

export default DesignationUpdate;



