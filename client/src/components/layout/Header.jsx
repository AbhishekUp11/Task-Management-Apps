import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useAuth();

  const handleAuthToggle = () => {
    navigate("/login");
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    setIsLoggedIn(!isLoggedIn);
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(to right, #2196F3, #3F51B5, #9C27B0)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" aria-label="logo">
            <FaUser className="text-3xl" />
          </IconButton>
          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            Task Management System
          </Typography>
        </Box>

        {/* Navigation */}
        <Box display="flex" alignItems="center" gap={2}>
          {console.log("auth?.user", auth?.user)}
          {!auth?.user && (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaSignInAlt />}
                onClick={handleAuthToggle}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<FaUser />}
                onClick={handleRegister}
              >
                Register
              </Button>
            </>
          )}

          {auth?.user && (
            <Button
              variant="contained"
              color="error"
              startIcon={<FaSignOutAlt />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
