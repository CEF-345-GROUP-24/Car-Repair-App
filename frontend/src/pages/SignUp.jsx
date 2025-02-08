import React, { useState } from 'react'
import '../styles/signUp.css'
import car2 from '../assets/car2.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function SignUp() {
  const navigate=useNavigate();
      const [name,setName]=useState();
      const [email,setEmail]=useState();
      const [password,setPassword]=useState();
      const [message,setMessage]=useState();
      const [messageColor,setMessageColor]=useState();
    const handleLogin=()=>{
        navigate('/login');
    }
    
   const handleSignUp=async(e)=>{
    e.preventDefault();
      
    try {
      const response = await axios.post('http://localhost:3000/signUp', {

        name, email,password
      });
  
      console.log("SignUp successfully.", response.data);
  
      
  
       setMessage("SignUp successful!");
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
        <form className="signUp">
            <h1>Get Started Now</h1>
            <div className="inputContainer">
                <span>Name</span>
                <div className="inputContainer2">
                    <input  
                        placeholder="enter your name"
                        className="name"
                        onChange={e=>setName(e.target.value)}
                    />
                </div>
            </div>
            <div className="inputContainer">
                <span>Email</span>
                <div className="inputContainer2">
                    <input  
                        placeholder="enter your email"
                        className="email"
                        onChange={e=>setEmail(e.target.value)}
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
                onClick={handleSignUp}>SignUp</button>
            <span className="span1">Already have an account?
              <span className="loginSpan"
                onClick={handleLogin}>Login
              </span>
            </span>
        </form>
        <div className="carContainer">
            <img src={car2} alt="background" className="image"/>
        </div>
        
  </div>
    
  )
}

export default SignUp