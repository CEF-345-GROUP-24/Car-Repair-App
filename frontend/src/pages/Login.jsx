import React, { useState } from 'react'
import '../styles/signUp.css'
import car2 from '../assets/car2.jpg'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [message,setMessage]=useState();
  const [messageColor,setMessageColor]=useState();
  const handleSignUp=()=>{
    navigate('/signUp');
}
   const handleLogin=async(e)=>{
    e.preventDefault();
      
    try {
      const response = await axios.post('http://localhost:3000/login', {
         email,password
      });
  
      console.log("Login successfully.", response.data);
  
      localStorage.setItem('token', response.data.token);
  
       setMessage("Login successful!");
        setMessageColor("green");
  } catch (error) {
      
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.error("Error:", error);
      setMessage(errorMessage); 
      setMessageColor("red");
  }
      
   }
  return (
    
      <div className="container">
        <div className="carContainerLogin">
          <img src={car2} alt="background" className="image"/>
        </div>
        <form className="signUp"
          onSubmit={e=>handleLogin(e)}  
        >
            <h1>Welcome Back !</h1>
           
            <div className="inputContainer">
                <span>Email</span>
                <div className="inputContainer2">
                    <input  
                        placeholder="enter your email"
                        className="email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="inputContainer">
                <span>Password</span>
                <div className="inputContainer2">
                    <input 
                        placeholder="enter your password"
                        type="password"
                        className="password"
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="messageBox" style={{color:messageColor}}>{message}</div>
            <button type="submit" className="signUpButton"
              >Login</button>
            <span className="span1">Don't yet have an account?
              <span className="loginSpan"
                onClick={handleSignUp}>SignUp
              </span>
            </span>
        </form>
        
        
  </div>
    
  )
}

export default Login