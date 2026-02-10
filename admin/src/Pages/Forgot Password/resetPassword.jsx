import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  InputAdornment,
  Container,
  Box,
  Typography,
  Alert
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';

// Import the API function
import { resetPassword } from '../../service/api';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the token from the URL (e.g. /password/reset/:token)
  const { token } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // 1. Basic Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
        // 2. Call API
        await resetPassword(token, password);
        
        setMessage("Password Reset Successfully! Redirecting to login...");
        
        // 3. Redirect after short delay
        setTimeout(() => {
            navigate('/login');
        }, 2000);

    } catch (err) {
        setError(err.message || "Token is invalid or has expired.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
    <div className='h-50 w-full bg-[#afcbff] place-content-center gap-4 items-center flex'>
        <h2 className="text-[60px] font-bold text-blue-900">E-Shop</h2>
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
        <div className="bg-blue-100 p-3 rounded-full mb-2">
            <KeyIcon className="text-blue-900" fontSize="large" />
        </div>

        <Typography component="h1" variant="h5" className="text-blue-900 font-bold mb-4">
          Set New Password
        </Typography>

        {message && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Reset Password"}
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
}