import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(
                "mongodb://" +
                    `${import.meta.env.MONGO_USERNAME}:${
                        import.meta.env.MONGO_PASSWORD
                    }@${import.meta.env.MONGO_URI}/${
                        import.meta.env.MONGO_DATABASE
                    }`,
                { bufferCommands: false }
            )
            .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
