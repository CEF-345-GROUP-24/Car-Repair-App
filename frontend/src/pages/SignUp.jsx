import React from 'react'
import '../styles/signUp.css'
import car2 from '../assets/car2.jpg'
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate=useNavigate();

    const handleLogin=()=>{
        navigate('/login');
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
                    />
                </div>
            </div>
            <div className="inputContainer">
                <span>Email</span>
                <div className="inputContainer2">
                    <input  
                        placeholder="enter your email"
                        className="email"
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
                    />
                </div>
            </div>
            <div className="messageBox"></div>
            <button type="submit" className="signUpButton">SignUp</button>
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