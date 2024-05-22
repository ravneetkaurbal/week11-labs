const jwt = require('jsonwebtoken');
// Function to create and sign a JWT
function createJWT() {
    const payload = {
      userId: 123,
      username: 'exampleUser'
    };
    const secretKey = 'yourSecretKey'; // Replace with your secret key
  
    // Sign the JWT with the payload and secret key
    const token = jwt.sign(payload, secretKey);
  
    console.log('JWT Token:', token);
  }
  
  // Call the function to create and sign a JWT
  createJWT();

  // ************************************************************

