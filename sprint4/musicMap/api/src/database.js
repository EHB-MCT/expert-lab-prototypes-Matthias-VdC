import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.DB);
const DATABASE = client.db('MusicMapApi');

export default DATABASE;
