import mongoose, { Mongoose } from "mongoose";

// ✅ Fix typing for global
declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI environment variable not defined");
}

// ✅ Use function-scoped variable with fallback
let globalMongoose = globalThis.mongoose ?? {
  conn: null,
  promise: null,
};

globalThis.mongoose = globalMongoose;

export async function dbConnect(): Promise<Mongoose> {
  if (globalMongoose.conn) return globalMongoose.conn;

  if (!globalMongoose.promise) {
    globalMongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  globalMongoose.conn = await globalMongoose.promise;
  return globalMongoose.conn;
}

export async function dbDisconnect(): Promise<void> {
  if (globalMongoose.conn) {
    await globalMongoose.conn.disconnect();
    globalMongoose.conn = null;
    globalMongoose.promise = null;
  }
}
