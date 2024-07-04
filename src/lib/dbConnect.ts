import mongoose from 'mongoose';

// database ke connection ke baad ky value aa raha hai uska type hai(nahi malum tab skip kar sakte ho es code ko)
type ConnectionObject = {
  isConnected?: number; // ? :- optional hai
};

const connection: ConnectionObject = {};

// database connection hone ke baad Promise return hoga
async function dbConnect(): Promise<void> {
  // database already connected hai tab
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    // readyState ek number hota hai jo isConnected me store kare rahe hai after database connect
    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;
