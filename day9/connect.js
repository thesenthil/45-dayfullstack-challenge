 const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "resumeData";

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB");

    const db = client.db(dbName);
    console.log(`📂 Using database: ${dbName}`);
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

main();
