require('dotenv').config({ path: '.env' }); // Load .env explicitly
const { MongoClient } = require('mongodb');

// Check if URI exists
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("❌ MONGO_URI missing in .env file");
}

async function dropCollection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("rentals_db");
    const collection = db.collection("rentalproviders");

    // Check if collection exists
    const collections = await db.listCollections({ name: "rentalproviders" }).toArray();
    if (collections.length === 0) {
      console.log("⚠️ Collection does not exist");
      return;
    }

    await collection.drop();
    console.log("🗑️ Collection dropped successfully");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

dropCollection();