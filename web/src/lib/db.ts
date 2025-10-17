import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

const mongoUsername =
    import.meta.env.MONGO_USERNAME || process.env.MONGO_USERNAME;
const mongoPassword =
    import.meta.env.MONGO_PASSWORD || process.env.MONGO_PASSWORD;
const mongoURI = import.meta.env.MONGO_URI || process.env.MONGO_URI;
const mongoDatabase =
    import.meta.env.MONGO_DATABASE || process.env.MONGO_DATABASE;
export async function connectToDatabase() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose
            .connect("mongodb://" + `${mongoURI}/${mongoDatabase}`, {
                bufferCommands: false,
                user: mongoUsername,
                pass: mongoPassword,
            })
            .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
