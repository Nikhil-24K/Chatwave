import React, { useState } from 'react';
import logo1 from '../img/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation", registerRoute);
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
       
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/Home");
      }
    }
  };

  const handleChange = (event) => {
  
      setValues({ ...values, [event.target.name]: event.target.value });
  
  };

  const handleValidation = () => {
    const { password, username, email, /* profileImg */ } = values;
    if (username.length < 3 || username === '') {
      toast.error('Enter valid username !', toastOptions);
      toast.error('Username should contain at least 3 characters', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Enter a valid email !', toastOptions);
      return false;
    } else if (password.length < 8 || password === '') {
      toast.error('Enter valid password !', toastOptions);
      toast.error('Password should contain at least 8 characters', toastOptions);
      return false;
    } 
    return true;
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <img
            className="logo"
            src={logo1}
            alt="Chatwave"
            style={{ maxWidth: '400px', maxHeight: '100px' }}
          />
          <span className="title">Register</span>
          <form onSubmit={(event) => handleSubmit(event)} encType="multipart/form-data">
           
            <input
              type="text"
              placeholder="User Name"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button type="submit">Sign up</button>
          </form>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
