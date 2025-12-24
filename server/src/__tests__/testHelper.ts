import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoDb: MongoMemoryServer;

// Connect to In Memory Mongo server
export const connect = async () => {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  mongoDb = await MongoMemoryServer.create();

  const uri = mongoDb.getUri();
  await mongoose.connect(uri);

  // Optionally check if mongoose.connection.db is available
  if (!mongoose.connection.db) {
    throw new Error("Failed to connect to in-memory database.");
  }
};

export const cleanData = async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  } else {
    throw new Error("Database connection is not available.");
  }
};

// Disconnect from In Memory Mongo server
export const disconnect = async () => {
  await mongoose.disconnect();
  // The Server can be stopped again with
  await mongoDb.stop();
};
