const constant = require("../Utils/constant")
const User=require("../Models/user.models")
const Ticket=require("../Models/ticket.model")
const sendNotificationReq=require("../Utils/notificationClient");

exports.createTicket=async (req,res)=>{
    

    try{

        const ticketObj={
            title:req.body.title,
            ticketPriority:req.body.ticketPriority,
            description:req.body.description,
            status:req.body.status,
            reporter:req.userId
        }
        
    
        const engineer=await User.findOne({
            userType:constant.userType.engineer,
            userStatus:constant.userStatus.approved
        });
       
        if(engineer)
        {
            ticketObj.assignee=engineer.userId;
        }
       

        const ticketCreated=await Ticket.create(ticketObj);

        if(ticketCreated)
        {
                const customer=await User.findOne({
                    userId:req.userId
                    
                });
               
                customer.ticketCreated.push(ticketCreated._id);
                await customer.save();

                if(engineer)
                {
                    engineer.ticketsAssigned.push(ticketCreated._id)
                    await engineer.save();
                }
                 sendNotificationReq(`Ticket Created with id: ${ticketCreated._id}`,"Yay!Movie ticket has been booked",`${customer.email},${engineer.email},kanvish@gmail.com`,"CRM APP");
                res.status(201).send(ticketCreated)
        }
    }catch(err)
    {
        console.log("Error while doing the DDB Operation",err);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.getTickets=async (req,res)=>{

    const user=await User.findOne({userId:req.userId})
    const ticketCreated=user.ticketCreated;
    const ticketAssigned=user.ticketsAssigned;
    const queryObj={};
    if(user.userType==constant.userType.customer)
    {
   
        if(!ticketCreated)
        {
           return res.status(200).send({
                message:"No Ticket are Created by the user yet"
            });
        }
        queryObj["_id"]={$in:ticketCreated};
        console.log("---------------------------------------")
        console.log(queryObj) 
    }
    else if(user.userType==constant.userType.engineer)
    {
        
      
        queryObj["$or"]=[{"_id":{$in:ticketCreated}},{"_id":{$in:ticketAssigned}}];
        console.log("---------------------------------------")
        console.log(queryObj) 
    }
    const tickets=await Ticket.find(queryObj);
    res.status(200).send(tickets)
}

exports.updateTickets=async (req,res)=>{

    try{
        
    const ticket=await Ticket.findOne({"_id":req.params.id});
    
    

    ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
    ticket.description = req.body.description != undefined ? req.body.description : ticket.description;
    ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
    ticket.status = req.body.status != undefined ? req.body.status : ticket.status;
    ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee;
    
    const updatedTicket=await ticket.save();

    res.status(200).send(updatedTicket);
    }
    catch(err){
        console.log("Some error While updating ticket",err.message);
        res.status(500).send({
            message:"Some Internal Error While Updating the Ticket"
        })
    }
}
