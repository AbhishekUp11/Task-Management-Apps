import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Add your API call or logic to handle registration here
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
