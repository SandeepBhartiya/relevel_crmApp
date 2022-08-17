

const db=require("../db")
const jwt=require("jsonwebtoken");
const auth=require("../../Config/auth.config")
const request=require("supertest")
const app=require("../../Server")
const User=require("../../Models/user.models");
let token;
beforeAll(async ()=>{
   
    await db.clearDatabase();
    

    await User.create({
        name:"Sandeep",
        userId:"san01",
        email:"sandeep@gmail.com",
        userType:"ADMIN",
        password:"Welcome1",
        userStatus:"APPROVED"
    });
    token=jwt.sign({id:"san01"},auth.secretkey,{
        expiresIn:120
    });
     
})

afterAll(async ()=>{
    await db.closeDatabase();
});

describe("Find All Users", ()=>{
    
    it("find all the users",async()=>{
       

        const res= await request(app).get("/crm/api/v1/users").set("x-access-token",token);
    
        expect(res.statusCode).toEqual(200);
        
        expect(res.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                "name" : "Sandeep",
                "userid" : "san01",
                "email" : "sandeep@gmail.com",
                "usertype" : "ADMIN",
               "userstatus" : "APPROVED"   
            })
        ])
    )

});
});

describe("Find the  User based on Id:", ()=>{
    
    it("test the endpoint /crm/api/v1/users/:id",async()=>{
      
       
        const res= await request(app).get("/crm/api/v1/users/san01").set("x-access-token",token);
    
        expect(res.statusCode).toEqual(200);
        
        expect(res.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                "name" : "Sandeep",
                "userid" : "san01",
                "email" : "sandeep@gmail.com",
                "usertype" : "ADMIN",
               "userstatus" : "APPROVED"   
            })
        ])
    )

});
});
    
