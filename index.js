const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const Objs = require("./init.js");


let port = 3000;

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static( path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));       //static files ko parse krne k liye

main().then((res)=>{console.log("connection established!");}).catch((err)=>{console.log(err);});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whapp");
}
console.log();

app.get("/chats:id/edit",async(req, res)=>{
    let {id} = req.params;                  //all the ids
    let ChatI = await Chat.findById(id);
    res.render("./edit.ejs", {ChatI});

});

app.post("/chats",(req, res)=>{
    let {from, to, msg} = req.body;
    console.log({from, to, msg});
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date()
    });
    newChat.save()
    .then((res)=>{console.log("new chat is uploaded");})
    .catch((err)=>{console.log(err);});
    res.redirect("/chats");
});

app.get("/chats/new",(req, res)=>{
    res.render("./new.ejs");
});

app.get("/chats", async(req, res)=>{
    let chats = await Chat.find();
    res.render("./index.ejs",{chats});
});

app.get("/", (req, res)=>{
    res.send("Welcome to the Home Page of Whatsapp :)");
});
app.listen(3000, ()=>{
    console.log(`app is listening on the port ${port}.`);
});