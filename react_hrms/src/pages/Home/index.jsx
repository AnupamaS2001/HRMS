import { useNavigate } from 'react-router-dom';
import './style.css';

const Home = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  const navigateToUpdate = () => {
    navigate('employee/update/1');
  };
  
  return (
    <div className="home-container">
      <button onClick={navigateToLogin}>Login</button>
      <button onClick={navigateToUpdate}>Update</button>
    </div>
  );
};

export default Home;
