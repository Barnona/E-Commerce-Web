import React, { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Link,
  Container,
  Box,
  Typography,
  Alert
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';

// --- UPDATED IMPORT PATH ---
import { forgotPassword } from '../../service/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // To show success feedback
  const [error, setError] = useState(''); // To show error feedback
  const [isLoading, setIsLoading] = useState(false);

  const onValueChange = (e) => {
    setEmail(e.target.value);
    // Clear errors when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);

    // API Call
    try {
        // We pass the email string directly, the API function wraps it in an object
        await forgotPassword(email); 
        setMessage(`If an account exists for ${email}, a reset link has been sent.`);
    } catch (err) {
        console.error("Forgot Password Error:", err);
        // Even if email doesn't exist, it's often good security practice 
        // to show the same success message or a generic error.
        // For this admin panel, we'll show the error for debugging/clarity.
        setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
        setIsLoading(false);
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
        {/* Icon Header */}
        <div className="bg-blue-100 p-3 rounded-full mb-2">
            <LockResetIcon className="text-blue-900" fontSize="large" />
        </div>

        <Typography component="h1" variant="h5" className="text-blue-900 font-bold mb-2">
          Forgot Password?
        </Typography>
        
        <Typography variant="body2" color="textSecondary" align="center" className="mb-6 px-4">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </Typography>

        {/* Feedback Alerts */}
        {message && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                {message}
            </Alert>
        )}
        {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
            </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          
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
            value={email}
            onChange={onValueChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle fontSize="small" />
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
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <Box display="flex" justifyContent="center">
            <Link href="/login" variant="body2">
              Remember your password? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
    </>
  );
}