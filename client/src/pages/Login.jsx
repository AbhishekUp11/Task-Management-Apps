import React, { useState } from "react";
import Header from "../components/layout/Header.jsx"
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, formData);
      console.log("res.data", res.data)
      if(res.data.success){
        console.log("res.data", res.data)
        toast.success(res.data.message)
        navigate("/tasks");
      }else{
        toast.error(res.data.message)
      }
    }catch(err){
      toast.error('Something went wrong')
    }
  };

  const handleForgotPassword = async (e) => {
     
  };

  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
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
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleForgotPassword}
            sx={{ mt: 2 }}
          >
            Forgot Password
          </Button>
        </form>
      </Paper>
    </Container>
      </>
  );
};

export default Login;
