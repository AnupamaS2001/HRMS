import { useNavigate } from 'react-router-dom';
import { logout } from '../../../api/logout'; // Adjust the path according to your project structure

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(
            (data) => {
                console.log('Logout successful:',data);
                navigate('/login');
            },
            (error) => {
                console.error('Logout failed:', error);
            }
        );
    }

    return (
        <div>
            <h1>Logout</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default Logout;
