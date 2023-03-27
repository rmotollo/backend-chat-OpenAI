import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    id: {type: String},
    userMessage: {type: String},
    lastCompletion: {type: String}
});

const messages = mongoose.model('messages', messageSchema);

export default messages;