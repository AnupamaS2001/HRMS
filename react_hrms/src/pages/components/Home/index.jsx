import './style.css';
import { Box } from '@mui/material';
import Login from '../LogIn';

const Home = () => {
  
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
