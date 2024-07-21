// import { useNavigate } from 'react-router-dom';
import './style.css';
// import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Login from '../LogIn';

const Home = () => {
  // const navigate = useNavigate();

  // const navigateToLogin = () => {
  //   navigate('/login');
  // };
  
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      backgroundImage: "url('public/login.jpg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display: 'flex', justifyContent: 'center', alignItems: 'center' 
    }}>
     <Box> 
      <Login />
     </Box>
    </Box>
  );
};

export default Home;
