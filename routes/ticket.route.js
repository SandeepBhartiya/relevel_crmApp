const ticketController=require("../controller/ticket.controller")
const {auth,verifyticket}=require("../Middleware")
module.exports=(app)=>{
    app.post("/crm/api/v1/tickets/",[auth.verifyToken,verifyticket.verifyTickets],ticketController.createTicket);

    app.get("/crm/api/v1/tickets/",[auth.verifyToken],ticketController.getTickets);

    app.put("/crm/api/v1/tickets/:id",[auth.verifyToken,verifyticket.isValidOwnerorTicket,verifyticket.verifyTickets],ticketController.updateTickets)

}
