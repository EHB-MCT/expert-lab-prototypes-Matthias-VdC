import { MongoClient } from 'mongodb';
import env from 'dotenv';
env.config();

const client = new MongoClient(process.env.DB);
const DATABASE = client.db('MusicMapApi');

export default DATABASE;
