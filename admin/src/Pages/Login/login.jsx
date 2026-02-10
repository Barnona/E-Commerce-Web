import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Container,
  Box,
  Typography
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

// --- UPDATED IMPORT PATH ---
import { loginUser } from '../../service/api'; 

export default function SignIn() {
  // 1. State to hold user input
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // 2. Handle Input Change
  const onValueChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // 3. Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please fill in all fields");
      return;
    }

    // Standard Login usually expects JSON, not FormData
    const credentials = {
        email: loginData.email,
        password: loginData.password
    };

    // API Call Logic
    try {
      const response = await loginUser(credentials);
      
      if (response.token) {
          localStorage.setItem('token', response.token);

          localStorage.removeItem('user');
          alert("Login Successful!");
          navigate('/'); // Redirect to Dashboard
      } else {
          alert("Login failed: No token received.");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message || "Invalid email or password.");
    }
  };

  return (
    <>
    <div className='h-50 w-full bg-[#afcbff] place-content-center gap-4 items-center flex'>
        <h2 className="text-[60px] font-bold text-blue-900">E-Shop</h2><p className="text-[60px] text-blue-900">Admin</p>
    </div>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="body2" color="textSecondary" className="mb-6">
          Sign in to your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          
          {/* Email Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
            value={loginData.email}
            onChange={onValueChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Field */}
          <FormControl margin="normal" required fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={loginData.password}
              onChange={onValueChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Box display="flex" justifyContent="space-between" width="100%">
            <Link href="/forgot-password" variant="body2">
              Forgot password?
            </Link>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
    </>
  );
}