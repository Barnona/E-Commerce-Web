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
  Typography,
  Stack
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BadgeIcon from '@mui/icons-material/Badge';

// --- UPDATED IMPORT PATH ---
import { registerUser } from '../../service/api'; 

export default function SignUp() {
  // 1. State for User Registration
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  // 2. Handle Input Change
  const onValueChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // 3. Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password
    };
    
    // API Call
    try {
      const response = await registerUser(payload);
      alert("Registration Successful! Press Login to continue");
      // Optionally navigate to login: navigate('/login');
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message || "Registration failed. Please try again.");
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
                Create an Admin Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
          <Stack spacing={2}>
            
            {/* Name Field */}
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              size="small"
              value={userData.name}
              onChange={onValueChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email Field */}
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              size="small"
              value={userData.email}
              onChange={onValueChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <FormControl required fullWidth variant="outlined" size="small">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
                value={userData.password}
                onChange={onValueChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* Confirm Password Field */}
            <FormControl required fullWidth variant="outlined" size="small">
              <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
              <OutlinedInput
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                label="Confirm Password"
                value={userData.confirmPassword}
                onChange={onValueChange}
              />
            </FormControl>

          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Box display="flex" justifyContent="center">
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
    </>
  );
}