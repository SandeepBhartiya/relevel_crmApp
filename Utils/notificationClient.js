const Client=require("node-rest-client").Client;

const client=new Client();


module.exports=(subject,content,recepients,requester)=>{
    try{
    const reqBody={
        subject:subject,
        content:content,
        recepients:recepients,
        requester:requester
    }
 
    const reqHeader={
        "Content-Type":"applicatiom/json"
    }

    const args={
             reqBody,
        reqHeader
    }
   console.log(args)

   

        client.post("http://localhost:8080/notiserv/api/v1/notification",args,(data,res)=>{
            console.log("Request sent");
            console.log(data);
            console.log(res);
        });

       
    }catch(err)
    {
            console.log(err.message)
    }
}