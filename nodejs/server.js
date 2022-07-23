const express = require("express");
const app = express();
const fs = require("fs");
const crypto = require("crypto");

const cors = require('cors');

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/sss", (req, res) => {
  res.send("this is response");
});

app.get("/users", (req, res) => {
  const data = fs.readFileSync("data.json", "utf8");
  const jsonParsedData = JSON.parse(data);
  if(jsonParsedData.length) {
    res.status(200).send({status: true, data: jsonParsedData});
  }
  res.status(400).json({status: false, message: "request error"})
});

app.post("/addUser", (req, res) => {
  const newData = req.body;
  if(newData?.name && newData?.age) {
    newData.id = crypto.randomBytes(16).toString("hex");
    const data = fs.readFileSync("data.json", "utf8");
    const jsonParsedData = JSON.parse(data);
    jsonParsedData.push(newData);
    const jsonData = JSON.stringify(jsonParsedData, null, 2);
    fs.writeFileSync("data.json", jsonData);
    res.status(201).json({ status: true, message: "User added successfully", data: newData });
  }
  res.status(400).json({status: false, message: "request error"})
});

app.delete("/removeUser", (req, res) => {
  const payloadData = req.body
  if(payloadData?.id) {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonParsedData = JSON.parse(data);
    const index = jsonParsedData.findIndex((item)=>item.id === payloadData.id)
    jsonParsedData.splice(index, 1)
    const jsonData = JSON.stringify(jsonParsedData, null, 2);
    fs.writeFileSync("data.json", jsonData);
    res.json({status: true, message: "User removed successfully"});
  }
  res.status(400).json({status: false, message: "request error"})
});

app.put("/updateUserData",(req,res)=>{
  const frontendData = req.body
  if(frontendData?.id && frontendData?.name && frontendData?.age) {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonParsedData = JSON.parse(data);
    const index = jsonParsedData.findIndex((item)=>item.id === frontendData.id)
    jsonParsedData[index] = frontendData
    const jsonData = JSON.stringify(jsonParsedData, null, 2);
    fs.writeFileSync("data.json", jsonData);
    res.json({status: true, message: "User Updated successfully"});
  }
  res.status(400).json({status: false, message: "request error"})
})

app.listen(5000, () => console.log("server is listening..."));
