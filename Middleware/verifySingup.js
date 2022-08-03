const User=require("../Models/user.models");
const constants=require("../Utils/constant");

 verifysingupRequestBody=async (req,res,next)=>{
    
    if(!req.body.name)
    {   
        return res.status(400).send(
        {
            message:"Failed!Username is not Provided"
        })
    }

    if(!req.body.userId)
    {
        return res.status(400).send({
            message:"Failed! UserId is not Provided"
        })
    }

    try  {
      const   user= await User.findOne({userId:req.body.userId});
        if(user != null) {
           return res.status(400).send({
                message: "Failed !UserId is already taken"
            });
        }
    }catch (err){
        return res.status(500).send({
            message : "Internal Server Error while Validating the request"
        })
    }



    
   
    if(!req.body.password)
    {
        return res.status(400).send({
            message:"Failed! Password is not Provided"
        })
    }

    
    if(!isValidEmail(req.body.email))
    {
        return res.status(400).send({
            message:"Failed ! Not a Valid email Id"
        })
    }

    if(!req.body.userType)
    {
        return res.status(400).send({
            message:"Failed ! userType is not Provided"
        })
    }
  

    if(req.body.userType==constants.userType.admin )
    {
        return res.status(400).send({
            message:"Failed ! Admin can't be take as Usertype"
        })
    }

    const  userType=[constants.userType.customer,constants.userType.engineer];
    
    if(!userType.includes(req.body.userType))
    {
        return res.status(400).send({
            message:"UserType Provided is not correct.Possible correct values: CUSTOMER | ENGINEER"
        })
    }

    
  

    next();
}

const isValidEmail= (email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

 validateSingInRequestBody=(req,res,next)=>{
    if(!req.body.userId)
    {
        return res.status(400).send({
            message:"Failed ! UserId is not Provided"
        })
    }
    
    if(!req.body.password)
    {
        return res.status(400).send({
            message:"Failed ! Password is not Provided"
        })
    }
    next();
}

const verifyRequestBodyForAuth={
    verifysingupRequestBody:verifysingupRequestBody,
    validateSingInRequestBody:validateSingInRequestBody
};

module.exports=verifyRequestBodyForAuth