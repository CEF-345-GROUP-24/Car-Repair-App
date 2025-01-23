const request = require('supertest');
const { app,pool} = require('../server.js');
const bcrypt = require('bcryptjs');



// Clean up after all tests
afterAll(async () => {
  try {
    // Delete test users
    await pool.execute('DELETE FROM users WHERE email = ?', ['test@example.com']);
    await pool.execute('DELETE FROM users WHERE email = ?', ['newuser@example.com']);
    // Delete test appointments
    await pool.execute('DELETE FROM appointments WHERE email = ?', ['test@example.com']);
  } catch (error) {
    console.error('Error cleaning up test users or appointments:', error);
  }

  // Close the pool after all tests are done
  await pool.end();
});

// Create a test user before all tests
beforeAll(async () => {
  await pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
    'Test User',
    'test@example.com',
    await bcrypt.hash('password123', 10), // Hash the password
  ]);
});

// Test for user sign-up
test('POST /signUp should create a user', async () => {
  const response = await request(app)
    .post('/signUp')
    .send({
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password123',
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Succeeded to create user');
});

// Test for successful login
test('POST /login should log in a user', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      email: 'test@example.com',
      password: 'password123',
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Login successful!');
  expect(response.body).toHaveProperty('token');
});

// Test for unsuccessful login due to incorrect password
test('POST /login should fail with incorrect password', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

  expect(response.statusCode).toBe(401);
  expect(response.body.message).toBe('Invalid email or password.');
});

// Test for unsuccessful login due to non-existent user
test('POST /login should fail with non-existent user', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

  expect(response.statusCode).toBe(401);
  expect(response.body.message).toBe('Invalid email or password.');
});

// Test for booking an appointment
test('POST /bookAppointment should book an appointment', async () => {
  const response = await request(app)
    .post('/bookAppointment')
    .send({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      date: '2025-01-20', // Change to a valid date
      time: '10:00 AM',   // Change to a valid time
      service: 'Consultation',
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Succeeded to book appointment');
});

// Test for booking an appointment without required fields
test('POST /bookAppointment should fail without required fields', async () => {
  const response = await request(app)
    .post('/bookAppointment')
    .send({
      name: 'Test User',
      // email is missing
      phone: '1234567890',
      date: '2025-01-20',
      time: '10:00 AM',
      service: 'Consultation',
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe('Failed to book appointment');
});

// Test for booking an appointment with invalid email
test('POST /bookAppointment should fail with invalid email', async () => {
  const response = await request(app)
    .post('/bookAppointment')
    .send({
      name: 'Test User',
      email: 'invalid-email', // Invalid email format
      phone: '1234567890',
      date: '2025-01-20',
      time: '10:00 AM',
      service: 'Consultation',
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe('Failed to book appointment');
});