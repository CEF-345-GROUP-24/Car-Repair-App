const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const jwt= require("jsonwebtoken");
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
const mysql2 = require('mysql2/promise'); // Use promise-based API

// Create a pool of connections
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'codeMan2.0',
    database: 'carprodb',
});

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'codeMan2.0',
    database: 'carprodb',
});

db.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log('Successfully connected to MySQL !!');
    }
});

// Create user model
class User {
    async create(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await db.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [user.name, user.email, hashedPassword]
        );
        
        return result[0];
    }
}
// Create appointment model 
    class Appointment{
        async create(appointment){
            const result = await db.execute(
                "INSERT INTO appointments (name, email, phone, date, time , service) VALUES (?,?,?,?,?,?)",
                [appointment.name, appointment.email,appointment.phone,
                    appointment.date,appointment.time,appointment.service]
            )
        }
    }

// Endpoint to sign up
app.post("/signUp", async (req, res) => {
    try {
        console.log("Received data:", req.body); // Log the received data
        const userInstance = new User();
        const user = await userInstance.create(req.body);
        
        res.json({ message: "Succeeded to create user" });
    } catch (error) {
        console.log("Error:", error); // Log the error
        res.status(400).json({ message: "Failed to create user" });
    }
});

// Endpoint to book an appointment
app.post("/bookAppointment", async (req, res) => {
    try {
        console.log("Received data:", req.body); // Log the received data
        const appointmentInstance = new Appointment();
        const appointment = await appointmentInstance.create(req.body);
        
        res.json({ message: "Succeeded to book appointment" });
    } catch (error) {
        console.log("Error:", error); // Log the error
        res.status(400).json({ message: "Failed to book appointment" });
    }
});

//
// Login endpoint
app.post('/login', async (req, res) => {
    console.log("Received data:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Fetch user from the database
        const [rows] = await db.promise().execute('SELECT * FROM users WHERE email = ?', [email]);
        

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
            const user = rows[0];

            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

            res.status(200).json({
                message: 'Login successful!',
                token, 
                user: { id: user.id, username: user.username, email: user.email }
            });
        

        
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    } 
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = {app,pool}; 