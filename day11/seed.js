const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function seedData() {
  try {
    await client.connect();
    const db = client.db('resumeData');
    const projects = db.collection('projects');

    await projects.deleteMany({}); // Clear old data

    const sampleProjects = [
      { title: "Portfolio Website", description: "Personal portfolio with HTML, CSS, JS", techStack: ["HTML", "CSS", "JS"], createdAt: new Date() },
      { title: "CRUD App", description: "Basic CRUD with Express & MongoDB", techStack: ["Node.js", "Express", "MongoDB"], createdAt: new Date() },
      { title: "E-commerce API", description: "API for online store", techStack: ["Node.js", "MongoDB"], createdAt: new Date() }
    ];

    const result = await projects.insertMany(sampleProjects);
    console.log(`Inserted ${result.insertedCount} sample projects`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedData();
