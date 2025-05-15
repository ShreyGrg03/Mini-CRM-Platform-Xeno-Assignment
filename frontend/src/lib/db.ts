// Import from our mock DB instead
import { mockCustomers, mockDB } from './mockDB';

// Export the mock customers and DB for use elsewhere
export { mockCustomers, mockDB };

// This function won't be used in the browser, but we'll keep it commented
// for reference on how it would work in a real server-side environment
/* 
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'mini-crm';

// Check if we have a MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global variable to cache the MongoDB client
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Create a new MongoDB client
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // Cache the client and db for reuse
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
*/
