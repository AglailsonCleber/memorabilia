import { MongoClient, ServerApiVersion, Db, InsertOneResult } from "mongodb";
import { genSaltSync, hashSync } from 'bcrypt-ts';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

export default client;

let db: Db | null = null;

// Conexão com o banco de dados
async function connectToDatabase(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db('auth');
  }
  return db;
}

// Tipagem para o retorno do usuário
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

// Função para buscar o usuário pelo email
export async function getUser(email: string): Promise<User | null> {
  const db = await connectToDatabase();
  const user = await db.collection<User>('users').findOne({ email });
  return user;
}

// Função para criar um novo usuário
export async function createUser(name: string, email: string, password: string): Promise<InsertOneResult<User>> {
  const db = await connectToDatabase();
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  const newUser: Omit<User, '_id'> = {
    name,
    email,
    password: hashedPassword,
  };

  const result = await db.collection('users').insertOne(newUser); // Removendo a tipagem explícita <User>
  return result;
}
