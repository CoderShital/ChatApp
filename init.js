const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then((res)=>{console.log("connection established!!");}).catch((err)=>{console.log(err)});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whapp");
};

let allChats= [
    {
        from:"Tanvi",
        to:"Shital",
        msg:"I did made it happen.",
        created_at:new Date()
    },
    {
        from:"Shital",
        to:"Tanvi",
        msg:"Yeah dude..! You are brilliant!",
        created_at:new Date()
    }
];

Chat.insertMany(allChats)
.then((res)=>{console.log(res);})
.catch((err)=>{console.log(err);});

module.exports=Chat;
