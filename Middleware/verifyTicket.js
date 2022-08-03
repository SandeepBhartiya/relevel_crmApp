const Ticket=require("../Models/ticket.model");
const User=require("../Models/user.models")
const constants=require("../Utils/constant")

const isValidOwnerorTicket=async (req,res,next)=>{

    const user=await User.findOne({userId:req.userId});
    const ticket=await Ticket.findOne({_id:req.params.id});
    
    if(user.userType==constants.userType.customer)
    {
        const ownerId=ticket.reporter;
        if(user.userId!=ownerId)
        {
                res.status(403).send({
                    message:"Only ADMIN|OWNER|ASSIGNED ENGINEER is allowed"
                });
        }
       
    }
    else if(user.userType==constants.userType.engineer)
    {
        const ownerId=ticket.reporter;
        const engineerId=ticket.assignee;

        if(user.userId!=ownerId && user.userId!=engineerId)
        {
            return res.status(403).send({
                message:"Only ADMIN|OWNER|ASSIGNED ENGINEER is allowed"
            })
        }
    }

    /*
        if the updates requires the changes in the assignee 

        1.Only Admin should be allowed to do this change
        2.Assignee should be valid Engineer
    */
    if(req.body.assignee!=undefined && user.userType!=constants.userType.admin)
    {
        return res.status(403).send({
            message:"Only ADMIN is allowed to re-assign a ticket"
        });
    }

    if(req.body.assignee!=undefined)
    {
        const engineer=await User.findOne({userId:req.body.assignee});

        if(engineer==null)
        {
            return res.status(401).send({
                message:"Engineer UserId is passed as assignee is wrong"
            });
        }
    }

next();
}

const verifyTickets=(req,res,next)=>{
    
    if(!req.body.title)
    {
        return res.status(400).send({
            message:"Failed!Title is not Provided"
        });
    }

    if(!req.body.description)
    {
        return res.status(400).send({
            message:"Failed!Description is not Provided"
        })
    }
    if(req.body.status==constants.ticketStatus.open)
    {
        
    }

next();
}

const verifyticket={
    isValidOwnerorTicket:isValidOwnerorTicket,
    verifyTickets:verifyTickets
};

module.exports=verifyticket