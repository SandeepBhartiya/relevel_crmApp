const bcrypt= require("bcryptjs");
const User= require("../Models/user.models")
const  jwt= require("jsonwebtoken")
const authConfig= require("../Config/auth.config")
const constant=require("../Utils/constant")
const objectConverter=require("../Utils/objectConverter")
exports.singup=async (req, res)=>{


    if(req.body.userType !=constant.userType.customer)
    {
        req.body.userStatus=constant.userStatus.pending;
    }

    const userObj={
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password,8),
        userStatus : req.body.userStatus
    };

    try{
        const userCreated=await User.create(userObj)
        
        const response={
            name:userCreated.name,
            userid:userCreated.userId,
            email:userCreated.email,
            userType:userCreated.userType,
            userStatus:userCreated.userStatus,
            CreatedAt:userCreated.createAt,
            UpdatedAt:userCreated.updateAt
        }
        res.status(201).send(response)
    }
    catch(err)
    {
        console.log("Some Error Happened",err.message);
        res.status(500).send({
            message:"Some internal Error"
        });
    }
}

exports.singin=async (req,res)=>{
    try
    {
        const user=await User.findOne({userId:req.body.userId});
      console.log(user)
        if(user==null)
        {
           return res.status(400).send({
                message:"Failed!UserId passed doesn't exist"
            });
        }

        if(user.userStatus==constant.userStatus.pending)
        {
            return res.status(500).send({
                message:"Not Yet Approved from the admin"
            })
        }
        const passwordIsValid=bcrypt.compareSync(req.body.password,user.password)
        
        if(!passwordIsValid)
        {
            return res.status(401).send({
                message:"Wrong Password"
            });
        }

        const token=jwt.sign({
            id:user.userId
        },authConfig.secretkey,{
            expiresIn:600
        })

        res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus,
            CreatedAt:user.createAt,
            accessToken:token
        });
    }catch(err)
    {
        console.log("Internal Error ",err.message);
        res.status(500).send({
            message:"Some internal error while singin"
        })
    }

}
