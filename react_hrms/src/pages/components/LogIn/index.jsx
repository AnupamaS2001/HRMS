import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { login } from '../../../api/login';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/employee/all');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(
        username,
        password,
        (successData) => {
          setMessage(`Login successful, welcome ${successData.username}!`);

          handleLogin();
        },
        (error) => {
          setMessage(error.response?.data?.error || 'Login failed');
        }
      );
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container>
      <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , mt : 40 }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={handleLogin}
          >
            Login
          </Button>
          {message && (
            <Typography variant="body2" color="error" align="center">
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
