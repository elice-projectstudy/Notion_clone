const { MongoClient } = require('mongodb');

// const connectionURL = process.env.DB_URL;
const connectionURL = `mongodb+srv://effysogood:effysode2024@cluster.07bvlxc.mongodb.net`;
const dbName = 'notion-app';
let db;

async function connectDB() {
  const client = await MongoClient.connect(connectionURL);
  db = client.db(dbName);
  console.log(`Connect to MongoDB`);
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
