const User=require("../Models/user.models");
const objectConverter=require("../Utils/objectConverter");

exports.findAll = async (req,res)=>{

    const queryObj={};
    const userTypeQP=req.query.userType;
    const userStatusQP=req.query.userStatus;

    if(userTypeQP)
    {
        queryObj.userType=userTypeQP
    }
    if(userStatusQP)
    {
        queryObj.userStatus=userStatusQP
    }
    try{
    
        const users=await User.find(queryObj);
         res.status(200).send(objectConverter.userResponse(users));
       
    }catch(err)
    {
        console.log("Error While Fetching all the users");
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}


exports.findByUserId= async (req,res)=>{

    try{
        const user=await User.find({userId:req.params.id})
        return res.status(200).send(objectConverter.userResponse(user))
        
    }catch(err){
        console.log("Error while Searching");
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
    
}

exports.update=async (req,res)=>{
    try{
        const user=await User.findOne({userId:req.params.id});
        user.userStatus=req.body.userStatus!=undefined?req.body.userStatus:user.userStatus;
        user.name=req.body.name!=undefined?req.body.name:user.name;
        user.userType=req.body.userType!=undefined?req.body.userType:user.userType;
        const updatedUser=await user.save();
        res.status(200).send({
            name:updatedUser.name,
            userId:updatedUser.userId,
            email:updatedUser.email,
            userType:updatedUser.userType,
            userStatus:updatedUser.userStatus
            
        })

    }catch(err){
        console.log("Updated Failed",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}