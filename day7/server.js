 const express = require('express');
const app = express();
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Day 7 Express Server!');
});

// Test route
app.get('/hello', (req, res) => {
  res.send('Hello, World! 👋');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
