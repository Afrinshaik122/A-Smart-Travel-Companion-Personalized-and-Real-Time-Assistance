// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   Grid,
//   InputAdornment,
//   TextField,
//   Typography,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import axios from "axios";
// import "../pages css/SignIn.css";

// import travelBg from "../Assests/images/signin/travel-bg.png";
// import tajMahal from "../Assests/images/signin/Tajmahal.png";
// import airplane from "../Assests/images/signin/Airplane.png";
// import monuments from "../Assests/images/signin/Monuments.png";

// const API_URL = "http://localhost:8000";

// const SignIn = ({ handleLogin}) => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const toggleForm = () => {
//     setIsRegistering(!isRegistering);
//     setError("");
//     setSuccess("");
//     setFormData({
//       fullname: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { fullname, email, phone, password, confirmPassword } = formData;

//     if (isRegistering) {
//       if (!fullname || !email || !phone || !password || !confirmPassword) {
//         setError("All fields are required!");
//         return;
//       }
//       if (!/^\S+@\S+\.\S+$/.test(email)) {
//         setError("Invalid email format!");
//         return;
//       }
//       if (!/^\d{10}$/.test(phone)) {
//         setError("Phone number must be 10 digits!");
//         return;
//       }
//       if (password !== confirmPassword) {
//         setError("Passwords do not match!");
//         return;
//       }

//       try {
//         const res = await axios.post(`${API_URL}/register`, {
//           fullname,
//           email,
//           phone,
//           password,
//         });

//         if (res.data.success) {
//           setSuccess("Registration successful! You can now login.");
//           toggleForm();
//         } else {
//           setError(res.data.message || "Error registering user!");
//         }
//       } catch {
//         setError("Registration failed. Please try again.");
//       }
//     } else {
//       if (!email || !password) {
//         setError("Email and Password are required!");
//         return;
//       }

//       try {
//         const res = await axios.post(`${API_URL}/login`, { email, password });

//         if (res.data.success) {
//           // Store user ID and email in AuthContext
//           login({ id: res.data.user.id, email: res.data.user.email });
//           navigate("/profile"); // Redirect to Profile
//         } else {
//           setError(res.data.message || "Login failed. Please try again!");
//         }
//       } catch {
//         setError("Login failed. Please try again!");
//       }
//     }
//   };

//   return (
//     <Grid container maxWidth="xl" className="main-container">
//       <Grid item xs={12} md={6} lg={5} className="left-container">
//         <img src={travelBg} alt="Travel" className="bg-image" />
//         <Box className="overlay">
//           <Typography variant="h3" className="logo">Travelista Tours</Typography>
//           <Typography variant="subtitle1" className="slogan">
//             Travel is the only purchase that enriches you in ways beyond material wealth.
//           </Typography>
//         </Box>
//       </Grid>

//       <Grid item xs={12} md={6} lg={7} className="right-container">
//         <Container maxWidth="xl" className="login-container">
//           <Box className="airplane-icon">
//             <img src={airplane} alt="Airplane" />
//           </Box>
//           <Typography variant="h4" className="welcome">
//             {!isRegistering ? "Welcome" : "Register"}
//           </Typography>
//           <Typography variant="body2" className="subtitle">
//             {!isRegistering ? "Login with Email" : "Register with Email"}
//           </Typography>

//           <form onSubmit={handleSubmit} noValidate>
//             {isRegistering && (
//               <>
//                 <TextField
//                   name="fullname"
//                   label="Full Name"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={formData.fullname}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PersonOutlineIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//                 <TextField
//                   name="phone"
//                   label="Phone Number"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PhoneIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </>
//             )}

//             <TextField
//               name="email"
//               label="Email"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               value={formData.email}
//               onChange={handleChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailOutlinedIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               name="password"
//               label="Password"
//               type="password"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               value={formData.password}
//               onChange={handleChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             {isRegistering && (
//               <TextField
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 type="password"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockOutlinedIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             )}
//             <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "1rem" }}>
//               {isRegistering ? "Register" : "Login"}
//             </Button>
//           </form>

//           {error && <Typography color="error" align="center">{error}</Typography>}
//           {success && <Typography color="primary" align="center">{success}</Typography>}

//           <Divider className="divider">OR</Divider>

//           <Typography align="center" style={{ marginTop: "1rem", color: "#666" }}>
//             {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
//             <span onClick={toggleForm} style={{ color: "#2196f3", cursor: "pointer" }}>
//               {isRegistering ? "Login" : "Register Now"}
//             </span>
//           </Typography>

//           <Box className="bottom-left">
//             <img src={tajMahal} alt="Taj Mahal" className="bottom-icon" />
//           </Box>
//           <Box className="bottom-right">
//             <img src={monuments} alt="Monuments" className="bottom-icon" />
//           </Box>
//         </Container>
//       </Grid>
//     </Grid>
//   );
// };

// export default SignIn;


import React, { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from "axios";
import "../pages css/SignIn.css";

import travelBg from "../Assests/images/signin/travel-bg.png";
import tajMahal from "../Assests/images/signin/Tajmahal.png";
import airplane from "../Assests/images/signin/Airplane.png";
import monuments from "../Assests/images/signin/Monuments.png";

const API_URL = "http://localhost:8000";

const SignIn = ({ handleLogin }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userid, setUserid] = useState("");

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setSuccess("");
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleLogout = () => {
    setUserid(""); // or setUserid(null)
    localStorage.removeItem("userid"); // ✅ Clear stored user ID
    logout(); // from AuthContext (if you're using a logout method there)
    navigate("/signin"); // or wherever your login page is
  };  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    const { fullname, email, phone, password, confirmPassword } = formData;

    if (isRegistering) {
      // 🔴 Validate Registration Form
      if (!fullname || !email || !phone || !password || !confirmPassword) {
        setError("All fields are required!");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("Invalid email format!");
        return;
      }
      if (!/^\d{10}$/.test(phone)) {
        setError("Phone number must be 10 digits!");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      try {
        const res = await axios.post(`${API_URL}/register`, {
          fullname,
          email,
          phone,
          password,
        });

        if (res.data.success) {
          setSuccess("Registration successful! You can now log in.");
          toggleForm();
        } else {
          setError(res.data.message || "Error registering user!");
        }
      } catch (error) {
        console.error("Registration Error:", error.message);
        setError("Registration failed. Please try again.");
      }
      return;
    }

    // 🔵 Login Logic (Placed Outside Registration Block)
    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      if (res.data.success) {
        const userIdFromResponse = res.data.user.id;
        setUserid(userIdFromResponse);
        localStorage.setItem("userid", userIdFromResponse); // ✅ Save in localStorage
        handleLogin(userIdFromResponse);
        login({ email }); // Store user in AuthContext
        navigate("/profile");
      }      
      else {
        setError(res.data.message || "Login failed. Please try again!");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      setError("Login failed. Please try again!");
    }
  };

  useEffect(() => {
    const savedUserId = localStorage.getItem("userid");
    if (savedUserId) {
      setUserid(savedUserId);
      handleLogin(savedUserId); // optional, if needed to reinitialize context
    }
    else {
      navigate("/signin"); // Redirect to login if not logged in
    }
  }, []);


  return (
    <Grid container maxWidth="xl" className="main-container">
      <Grid item xs={12} md={6} lg={5} className="left-container">
        <img src={travelBg} alt="Travel" className="bg-image" />
        <Box className="overlay">
          <Typography variant="h3" className="logo">Travelista Tours</Typography>
          <Typography variant="subtitle1" className="slogan">
            Travel is the only purchase that enriches you in ways beyond material wealth.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={7} className="right-container">
        <Container maxWidth="xl" className="login-container">
          <Box className="airplane-icon">
            <img src={airplane} alt="Airplane" />
          </Box>
          <Typography variant="h4" className="welcome">
            {!isRegistering ? "Welcome" : "Register"}
          </Typography>
          <Typography variant="body2" className="subtitle">
            {!isRegistering ? "Login with Email" : "Register with Email"}
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            {isRegistering && (
              <>
                <TextField
                  name="fullname"
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={formData.fullname}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}

            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            {isRegistering && (
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {error && (
              <Typography align="center" style={{ color: "red", marginTop: "1rem" }}>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "1rem" }}>
              {isRegistering ? "Register" : "Login"}
            </Button>
          </form>

          <Divider className="divider">OR</Divider>

          <Typography align="center" style={{ marginTop: "1rem", color: "#666" }}>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={toggleForm} style={{ color: "#2196f3", cursor: "pointer" }}>
              {isRegistering ? "Login" : "Register Now"}
            </span>
          </Typography>

          <Box className="bottom-left">
            <img src={tajMahal} alt="Taj Mahal" className="bottom-icon" />
          </Box>
          <Box className="bottom-right">
            <img src={monuments} alt="Monuments" className="bottom-icon" />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignIn;