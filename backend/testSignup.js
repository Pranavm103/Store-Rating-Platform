const axios = require('axios');

async function testSignup() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'TestPass123!',
      address: '123 Test St',
      role: 'user'
    });
    console.log('Signup successful:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Signup failed:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testSignup();
