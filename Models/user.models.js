const mongoose=require('mongoose');
const constant=require("../Utils/constant");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
        lowercase:true
    },
    createAt:{
        type:Date,
        immutabel:true,
        default:()=>{
            return Date.now()
        }
    },
    updateAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    },
    userType:{
        type:String,
        required:true,
        default:constant.userType.customer,
        enum:[constant.userType.customer,constant.userType.engineer,constant.userType.admin]
    },
    userStatus:{
        type:String,
        required:true,
        default:constant.userStatus.approved,
        enum:[constant.userStatus.approved,constant.userStatus.pending,constant.userStatus.rejected]
    },
    ticketCreated:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"Ticket"
    },
    ticketsAssigned:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"Ticket"
    }
},{versionKey:false});

module.exports=mongoose.model("user",userSchema)
