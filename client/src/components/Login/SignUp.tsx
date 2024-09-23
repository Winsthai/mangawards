import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserTextField from "./UserTextField";
import userService from "../../services/user";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for email and password
    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Implement logic here
    await userService.addNewUser(username, password);

    // Reset error and form
    setError("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");

    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      {/* Outer wrapper for centering the component */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Account created successfully!
          </Alert>
        </Snackbar>
        {/* Square box container */}
        <Box
          sx={{
            backgroundColor: "#1c1f26",
            width: "100%",
            height: "400px",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "32px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            border: "solid",
          }}
        >
          <Typography component="h1" variant="h5" color="white" gutterBottom>
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {/* Username Field */}
            <UserTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              slotProps={{
                input: {
                  style: { color: "white" }, // Replace InputProps
                },
                inputLabel: {
                  style: { color: "#b0b3b8" }, // Replace InputLabelProps
                },
              }}
            />

            {/* Password Field */}
            <UserTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  style: { color: "white" },
                },
                inputLabel: {
                  style: { color: "#b0b3b8" },
                },
              }}
            />

            {/* Confirm Password Field */}
            <UserTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              slotProps={{
                input: {
                  style: { color: "white" },
                },
                inputLabel: {
                  style: { color: "#b0b3b8" },
                },
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#3f51b5",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              Sign Up
            </Button>

            {/* Sign-in Link using Stack */}
            <Stack direction="row" justifyContent="flex-end">
              <Typography variant="body2" color="white">
                Already have an account? <Link to="/login">Sign in</Link>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
