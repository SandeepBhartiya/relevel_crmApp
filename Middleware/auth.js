const jwt=require("jsonwebtoken");
const authConfig=require("../Config/auth.config");
const User=require("../Models/user.models")
const constants=require("../Utils/constant")


const verifyToken=(req,res,next)=>{
    const token=req.headers["x-access-token"];
    if(!token)
    {
        return res.status(403).send({
            message:"No Token is Provided !Access Prohibited"
        })
    }

    jwt.verify(token,authConfig.secretkey,(err,decoded)=>{
        if(err){
            return res.status(400).send({
                message:"UnAuthorised"
            })
        }

        req.userId=decoded.id;
        next();
    })
}

const isAdmin=async (req,res,next)=>{
    const user=await User.findOne({userId:req.userId})
    if(user && user.userType==constants.userType.admin)
    {
        next();
    }
    else
    {
        res.status(403).send({
            message:"Only Admin Users are allowed to access "
        })
    }
}

const isValidUserIdInReqParama=async (req,res,next)=>{
    try
    {
        const user=User.find({userId:req.params.id})
        if(!user)
        {
            return res.status(400).send({
                message:"UserId Passed Doesn't Exist"
            })
        }
        next();
    }catch(err)
    {
        console.log("Error While Reading the user Info");
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const isAdminOROwner=async (req,res,next)=>{
    try
    {
        
      const callingUser=await User.findOne({userId:req.userId})
        if(callingUser.userType==constants.userType.admin || callingUser.userId==req.params.id)
    {
        next();
    }
      else{
        res.status(403).send({
            message:""
        })
      }
    }catch(err)
    {
        console.log("Error While Reading the user Info");
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}
const authjwt={
    verifyToken:verifyToken,
    isAdminOROwner:isAdminOROwner,
    isAdmin:isAdmin,
    isValidUserIdInReqParama:isValidUserIdInReqParama 

}

module.exports=authjwt  