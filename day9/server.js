const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'resumeData';
let db;

// Connect to MongoDB
MongoClient.connect(url)
  .then(client => {
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Test route
app.get('/', (req, res) => {
  res.send('Resume API is running!');
});

// Insert resume data (always your name: Senthil)
app.post('/resume', async (req, res) => {
  try {
    const data = req.body;
    data.name = "Senthil"; // Force name to Senthil
    const collection = db.collection('resumes');
    const result = await collection.insertOne(data);
    res.status(201).send({ message: 'Resume added', id: result.insertedId });
  } catch (err) {
    res.status(500).send({ error: 'Failed to insert data', details: err });
  }
});

// Get all resume data
app.get('/resume', async (req, res) => {
  try {
    const collection = db.collection('resumes');
    const resumes = await collection.find({}).toArray();
    res.send(resumes);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data', details: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
