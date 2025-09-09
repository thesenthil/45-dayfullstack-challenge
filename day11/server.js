const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projects');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.locals.db = client.db('resumeData');

    app.use('/api/projects', projectRoutes);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

main();
