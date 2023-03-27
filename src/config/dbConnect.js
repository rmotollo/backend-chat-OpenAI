import { mongoose } from "mongoose";

mongoose.connect("mongodb+srv://motollolab:mongodb2023@cluster0.ehgfx.mongodb.net/prompt-objects")

let db = mongoose.connection;

export default db;