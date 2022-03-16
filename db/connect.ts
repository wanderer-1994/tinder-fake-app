import { connect } from 'mongoose';

const dbURI = `mongodb+srv://${process.env.DB_APP_ID}:${process.env.DB_APP_SECRET}@${process.env.DB_APP_HOST}`;
const connection = { isInitialized: false };

async function dbInit() {
  if (!connection.isInitialized) {
    await connect(dbURI);
    console.log('MongoDB connected!');
    connection.isInitialized = true;
  }
}

dbInit();

export default dbInit;
