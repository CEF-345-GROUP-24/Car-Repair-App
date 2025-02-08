import React, { useState } from 'react'
import '../styles/home.css'
import car3 from "../assets/car3.jpg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Home() {
   // appointment.name, appointment.email,appointment.phone,
   //appointment.date,appointment.time,appointment.service
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [phone,setPhone]=useState();
    const [date,setDate]=useState();
    const [time,setTime]=useState();
    const [service,setService]=useState("oil-change");
    const [message,setMessage]=useState();
    const [messageColor,setMessageColor]=useState();
    const navigate=useNavigate();
    const handleLogin=()=>{
        navigate('/login');
    }
    const handleSignUp=()=>{
        navigate('/signUp');
    }
    const handleBookAppointment=async(e)=>{
        e.preventDefault();
      
    try {
      const response = await axios.post('http://localhost:3000/bookAppointment', {

        name, email,phone,date,time,service
      });
  
      console.log("Appointment booked successfully.", response.data);
  
      
  
       setMessage("Appointment booked successfully!");
        setMessageColor("green");
  } catch (error) {
      
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.error("Error:", error);
      setMessage(errorMessage); 
      setMessageColor("red");
  }
      
    }
  return (
    <div>
        <nav>
            <span className="title">CarPro</span>
            <a href="index.html" className="present">Home</a>
            <a href="car.html">Car</a>
            <a href="database.html">Database</a>
            <a href="maintenance.html">Maintenance</a>
            <a href="shop.html">Shop</a>
            <button className="joinUs" onClick={handleSignUp}>Join Us</button>
            <button className="login" onClick={handleLogin}>Login</button>
        </nav>
    <main className="content">
        <div className="welcome">
            <h1>Welcome to CarPro</h1>
            <span>Your trusted partner for all your car repair needs.
                We are dedicated to providing reliable,
                high-quality service that keeps you safely on the road.</span>
            <button className="getStarted" onClick={handleSignUp}>Get Started</button>
        </div>
    
        <img src={car3} alt="background" className="image" />
    </main>
    <section className="services">
        <h2>Our Services</h2>
        <div className="service-card">
            <h3>Oil Change</h3>
            <p>Keep your engine healthy with regular oil changes.</p>
        </div>
        <div className="service-card">
            <h3>Tire Services</h3>
            <p>Flat tires? We provide tire repair and replacement.</p>
        </div>
        <div className="service-card">
            <h3>Brake Repair</h3>
            <p>Ensure your safety with our expert brake services.</p>
        </div>
        <div className="service-card">
            <h3>Engine Diagnostics</h3>
            <p>Identify engine issues quickly with our advanced diagnostic tools.</p>
        </div>
        <div className="service-card">
            <h3>Collision Repair</h3>
            <p>Restore your vehicle's appearance and safety after an accident with our collision services.</p>
        </div>
    </section>
    <form className="appointment-form">
        <h2>BOOK AN APPOINTMENT</h2>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required
            onChange={e=>setName(e.target.value)}
        />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required
            onChange={e=>setEmail(e.target.value)}
        />

        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required
            onChange={e=>setPhone(e.target.value)}
        />

        <label for="date">Preferred Date:</label>
        <input type="date" id="date" name="date" required
            onChange={e=>setDate(e.target.value)}    
        />

        <label for="time">Preferred Time:</label>
        <input type="time" id="time" name="time" required
            onChange={e=>setTime(e.target.value)}    
        />

        <label for="service">Service Needed:</label>
        <select id="service" name="service" required
            onChange={e=>setService(e.target.value)}    
        >
            <option value="oil-change">Oil Change</option>
            <option value="tire-service">Tire Service</option>
            <option value="brake-repair">Brake Repair</option>
            <option value="brake-repair">Engine Diagnostics</option>
            <option value="brake-repair">Collision repair</option>
            <option value="full-checkup">Full Checkup</option>
        </select>
        <div className="messageBox" style={{color:messageColor}}>{message}</div>
        <button type="submit" className="submit-button"
            onClick={(e)=>handleBookAppointment(e)}>Book Appointment</button>
    </form>
    <section className="about">
        <h2>About Us</h2>
        <p>At CarPro, we are committed to providing the best car repair services at affordable prices. Our experienced technicians use the latest technology and techniques to ensure your vehicle is in top condition.</p>
    </section>

    <footer className="footer">
        <p>&copy; 2024 CarPro. All rights reserved.</p>
        <a href="contact.html">Contact Us</a>
    </footer>
    </div>
  )
}

export default Home