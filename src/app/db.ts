import { MongoClient, ServerApiVersion } from "mongodb"
import { genSaltSync, hashSync } from 'bcrypt-ts';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client: MongoClient
 
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}
 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client

let db: any;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('auth');
  }
  return db;
}

// Função para buscar um usuário pelo email
export async function getUser(email: string) {
  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ email });
  return user;
}

// Função para criar um novo usuário
export async function createUser(name: string, email: string, password: string) {
  const db = await connectToDatabase();
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  const result = await db.collection('users').insertOne(newUser);
  return result.insertedId;
}

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
