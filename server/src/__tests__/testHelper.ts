import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoDb: MongoMemoryServer;

// Connect to In Memory Mongo server
export const connect = async () => {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  mongoDb = await MongoMemoryServer.create();

  const uri = mongoDb.getUri();
  await mongoose.connect(uri);
};

export const cleanData = async () => {
  await mongoose.connection.db.dropDatabase();
};

// Disconnect from In Memory Mongo server
export const disconnect = async () => {
  await mongoose.disconnect();
  // The Server can be stopped again with
  await mongoDb.stop();
};
