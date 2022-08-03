
const authController=require("../controller/auth.contoller")
const {verifySingup}=require("../Middleware")
module.exports=(app)=>{
    app.post("/crm/api/v1/auth/singup",[verifySingup.verifysingupRequestBody],authController.singup)
    app.post("/crm/api/v1/auth/singin",[verifySingup.validateSingInRequestBody],authController.singin)
}