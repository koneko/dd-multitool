import mongoose, { Model } from "mongoose";

const BuildSchema = new mongoose.Schema({
    name: String,
    mapID: Number,
    towers: Array,
    description: String,
    authorName: String,
    authorID: Number,
});

export const Build =
    (mongoose.models.Build as Model<any>) ||
    (mongoose.model("Build", BuildSchema) as Model<any>);
