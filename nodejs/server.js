const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");
const crypto = require("crypto");
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const id = crypto.randomBytes(16).toString("hex")

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.status(200).json("this is about page");
});

let student = { 
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};

student.id = id
 
let data = JSON.stringify(student, null,2);

// fs.writeFile('./storedData/data.json', data, (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// });

// fs.readFile('./storedData/data.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data);
//   });

app.post("/addUser", (req, res) => {
  console.log("adduser request",req.body)
  const {name} = req.body
  if(!name) {
    return res.status(400).json({data: "this is bad request", status: false})
  }
  res.status(201).json({data: "this is data", status: true})
  // let fileData = null
  // fs.readFileSync('./storedData/data.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(data);
  //   fileData = data
  // });

  // const parsedData = JSON.parse(fileData)


  // fs.writeFile("./storedData/data.txt", "Hello World!", function (err) {
  //   if (err) return console.log(err);
  //   console.log("Hello World > data.txt");
  // });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
