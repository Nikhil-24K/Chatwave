import React, { useEffect, useState } from 'react';
import logo1 from '../img/logo1.png';
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
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

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate('/Home');
    }
  },[navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { email, password } = values;
        const response = await axios.post(loginRoute, {
          email,
          password,
        });
  
        const { data } = response; 
  
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/Home");
        }
      } catch (error) {
        console.error("Axios Error:", error);
        toast.error("An error occurred. Please try again later.", toastOptions);
      }
    }
  };
  

  const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
   
  };

  const handleValidation = () => {
    const { password, email } = values;
    if (email === '') {
      toast.error('Username and Password is required', toastOptions);
      return false;
    } else if (password === '') { 
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
          <span className="title">Login</span>
          <form onSubmit={(event) => handleSubmit(event)} >
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
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
