const {findAll , update }=require("../../controller/user.controller");
const User=require("../../Models/user.models");
const {mockRequest,mockResponse}=require("../interceptor")


const userTestPayload = {
    name: "Test",
    userId : "Test01",
    email : "test@gmail.com",
    userType : "CUSTOMER",
    userStatus : "APPROVED",
    ticketsCreated : [],
    ticketsAssigned : []   
}
describe("test findall method",()=>{
it("test the scnerio when no query param is passed",async ()=>{

    const userSpy=jest.spyOn(User,'find').mockReturnValue(Promise.resolve([userTestPayload]))

    const req=mockRequest();
    const res=mockResponse();

    req.query={}

    await findAll(req,res)  

    expect(userSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
        expect.arrayContaining([
            expect.objectContaining({
                name:"Test"
            })
        ])
    )
});
it("test the scenario when user status is passed in query param",async ()=>{
    const userSpy=jest.spyOn(User,'find').mockReturnValue(Promise.resolve([userTestPayload]))

    const req=mockRequest();
    const res=mockResponse();


    req.query={userSatus:"APPROVED"}

    await findAll(req,res);

    expect(userSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
        expect.arrayContaining([
            expect.objectContaining({
                "userstatus" : "APPROVED"
            })
        ])
    )

});



it("error while calling the User.find method",async()=>{
    const userSpy=jest.spyOn(User,'find').mockReturnValue(Promise.reject(new Error("error")));

    const req=mockRequest();
    const res=mockResponse();
    req.query={userStatus:"APPROVED"};

    await findAll(req,res);

    expect(userSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
        message:"Internal Server Error"
    })

});

})




describe("test Update Method", ()=>{
    it("test the scenario when no query param is passed",async ()=>{

        const userSpy=jest.spyOn(User,'update').mockReturnValue(Promise.resolve([userTestPayload]));
        
        const req=mockRequest();
        const res=mockResponse();

        req.query={};

        await update(req,res);

        expect(userSpy).toHaveBeenCalled();
        expected(res.status).toHaveBeenCalledWith(200);
        expected(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    name:"Test"
                })
            ])
        )
    });
    it("test the scenario when query param is provided",async()=>{
        
        const userSpy=jest.spyOn(User,'update').mockReturnValue(Promise.resolve([userTestPayload]));

        const req=mockRequest();
        const res=mockResponse();

        req.query={userId:"Test01"};

        await update(req,res);
        expect(userSpy).toHaveBeenCalled();
    });
    // it("erro while calling User.update Method",async()=>{
        
    //     const userSpy=jest.spyOn(User,'update').mockReturnValue(Promise.reject(new Error("error")));

    //     const req=mockRequest();
    //     const res=mockResponse();

    //     req.query={userId:"Test01"};

    //     await update(req,res);
    //     expect(userSpy).toHaveBeenCalled();
    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.send).toHaveBeenCalledWith({
    //         message:"Internal Server Error"
    //     })
    
    // });
})