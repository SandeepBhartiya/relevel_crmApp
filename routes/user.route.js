const userController=require("../controller/user.controller")
const {auth}=require("../Middleware")
module.exports=(app)=>{
    app.get("/crm/api/v1/users",[auth.verifyToken,auth.isAdmin],userController.findAll );

    app.get("/crm/api/v1/users/:id",[auth.verifyToken,auth.isAdmin,auth.isAdminOROwner,auth.isValidUserIdInReqParama],userController.findByUserId)

    app.put("/crm/api/v1/users/:id",[auth.verifyToken,auth.isAdmin,auth.isAdminOROwner,auth.isValidUserIdInReqParama],userController.update)
}