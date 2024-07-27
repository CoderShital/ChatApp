const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxLength:55,
    },
    created_at:{
        type:Date,
        required:true,
    }
});

const Chat = mongoose.model("Chats", chatSchema);
module.exports = Chat;