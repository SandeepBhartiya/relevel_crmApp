

const express=require('express')
const app=express()
const mongoose=require("mongoose")
const serverconf=require("./Config/server.config")
const bodyParser=require("body-parser")
const dbconfig=require("./Config/db.config")
const User=require("./Models/user.models")
const bcrypt=require("bcryptjs")
const Ticket=require("./Models/ticket.model")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(dbconfig.DB);
const db=mongoose.connection;
db.on("err",()=>{
    console.log("Error")
});
db.once("open",()=>{
    console.log("Connected to mongoDB")
    init()
});



async function init()
{
    try{
    // const user=await User.findOne({userId:"admin"})
    await User.collection.drop();
    await Ticket.collection.drop();
    // if(user)
    // {
    //     console.log("Admin User is present")
    //     return;
    // }
  const user= await User.create({
        name:"Sandeep",
        userId:"admin",
        password:bcrypt.hashSync("Welcome1",8),
        email:"san@gmail.com",
        userType:"ADMIN"
        });

        console.log(user)
    }catch(err)
    {
        console.log("err in db initialization",err.message)
    }
}



require("./routes/auth.route")(app);
 require("./routes/user.route")(app);
 require("./routes/ticket.route")(app);

 app.listen(serverconf.PORT,()=>{
    console.log("I Am Listening At",serverconf.PORT)
});