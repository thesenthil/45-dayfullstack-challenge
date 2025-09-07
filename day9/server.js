// Import required modules
const express = require("express");
const { MongoClient } = require("mongodb");

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection URL
const url = "mongodb://localhost:27017"; // local MongoDB instance
const dbName = "resumeData"; // database name

// Async function to connect to MongoDB
async function run() {
    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("✅ Connected successfully to MongoDB");

        const db = client.db(dbName); // select the database
        console.log(`Database Selected: ${db.databaseName}`);

        // Get a collection (will create if not exists)
        const collection = db.collection("resumes");

        // Sample resume document
        const sampleResume = {
            name: "Senthil",
            email: "senthil@example.com",
            phone: "123-456-7890",
            skills: ["JavaScript", "Node.js", "MongoDB", "Express"],
            experience: [
                { company: "ABC Corp", role: "Junior Developer", years: 1 },
                { company: "XYZ Ltd", role: "Intern", years: 0.5 }
            ]
        };

        // Insert the sample document
        const insertResult = await collection.insertOne(sampleResume);
        console.log("Document inserted with _id:", insertResult.insertedId);

        // Fetch and log all documents from collection
        const allResumes = await collection.find({}).toArray();
        console.log("All resumes in collection:", allResumes);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        // Close the connection
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// Call the async function
run();

// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
