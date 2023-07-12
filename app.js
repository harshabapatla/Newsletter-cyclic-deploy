// const express = require("express");
// const bodyParser = require("body-parser");
// const request= require("request");
// const https= require("https");
// const app = express();
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({
//     extended:true
// }));

// app.get("/", function(req,res){
//     res.sendFile(__dirname+"/signup.html");
//     }
// );


// const { url } = require("inspector");



// app.post("/",function(req,res){
//     const firstName =req.body.fName;
//     const lastName = req.body.lName;
//     const email =req.body.email;
    
//     const data ={
//         members:[{
//             email_address:email,
//             status:"subscribed",
//             merge_fields:{
//                 FNAME:firstName,
//                 LNAME:lastName
//             }
//         }]
//     };
//     const jsonData =JSON.stringify(data);

//     const url ='https://us21.api.mailchimp.com/3.0/lists/cdf2fd6f6a';
//     const options = {
//         method: "POST",
//         auth: "harshab:66ebee849091f05e02003a34e13c9c22-us21"
//     };
//    const request= https.request(url,options,function(response){
//         response.on("data",function(data){
//             console.log(JSON.parse(data));
//         })

//     })
//     request.write(jsonData);
//     request.end();
    
// });


// app.listen("3000",function(request,response){
//     console.log("server is running on port 3000");
// });




// API key 
// 3f15ac0a04bf5bb4aea38d1ed7ebd6a0-us21
// unq id cdf2fd6f6a cdf2fd6f6a


// new api key : 66ebee849091f05e02003a34e13c9c22-us21

// new key : f5bfe0e6e576e182424dd6c99c747a73-us21


const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  //const url = "https://us21.api.mailchimp.com/3.0/lists/cdf2fd6f6a";
  const url ="cdf2fd6f6a";
  const options = {
    method: "POST",
    auth: "f5bfe0e6e576e182424dd6c99c747a73-us21"
    //auth: "harshab:aa562c9d42d82b125910e6aaa38bb75b-us21",
    // aa562c9d42d82b125910e6aaa38bb75b-us21
  };
  
  const request = https.request(url, options, function (response) {
    if (response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT||3000, function () {
  console.log("Server is running");
});
