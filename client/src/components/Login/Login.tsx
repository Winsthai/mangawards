import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserTextField from "./UserTextField";
import loginService from "../../services/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Do stuff here
    console.log("Sign In:", { username, password });

    try {
      const user = await loginService.login(username, password);

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Reset error and form
      setError("");
      setUsername("");
      setPassword("");

      navigate("/");

      window.location.reload();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Invalid username or password");
    }
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
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

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
                  style: { color: "white" },
                },
                inputLabel: {
                  style: { color: "#b0b3b8" },
                },
              }}
            />

            <UserTextField
              variant="outlined"
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
              slotProps={{
                input: {
                  style: { color: "white" },
                },
                inputLabel: {
                  style: { color: "#b0b3b8" },
                },
              }}
            />

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
              Sign In
            </Button>

            <Stack direction="row" justifyContent="flex-end">
              <Typography variant="body2" color="white">
                Don't have an account? <Link to="/signUp">Sign up</Link>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
