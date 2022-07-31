const express = require("express");
const app = express();
const fs = require("fs");
const crypto = require("crypto");
const { MongoClient } = require("mongodb");

const cors = require("cors");

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

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb://localhost:27017/myapp";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
app.get("/users", (req, res) => {
  const data = fs.readFileSync("data.json", "utf8");
  const jsonParsedData = JSON.parse(data);
  setTimeout(() => {
    if (jsonParsedData.length) {
      res.status(200).send({ status: true, data: jsonParsedData });
    } else {
      res.status(200).send({ status: false, data: "No data is found" });
    }
  }, 1000);
});

app.get("/users/:userId", (req, res) => {
  const data = fs.readFileSync("data.json", "utf8");
  const jsonParsedData = JSON.parse(data);
  const foundData = jsonParsedData.find((item) => item.id === req.query.id);
  setTimeout(() => {
    res.status(200).json({
      status: foundData ? true : false,
      data: foundData ? foundData : "Sorry! Data is not found for given user.",
    });
  }, 1000);
});

app.post("/addUser", (req, res) => {
  const newData = req.body;
  if (newData?.name && newData?.age) {
    newData.id = crypto.randomBytes(16).toString("hex");
    const data = fs.readFileSync("data.json", "utf8");
    const jsonParsedData = JSON.parse(data);
    jsonParsedData.push(newData);
    const jsonData = JSON.stringify(jsonParsedData, null, 2);
    fs.writeFileSync("data.json", jsonData);
    res.status(201).json({
      status: true,
      message: "User added successfully",
      data: newData,
    });
  }
  res.status(400).json({ status: false, message: "request error" });
});

app.delete("/removeUser", (req, res) => {
  const payloadData = req.body;
  if (payloadData?.id) {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonParsedData = JSON.parse(data);
    const index = jsonParsedData.findIndex(
      (item) => item.id === payloadData.id
    );
    jsonParsedData.splice(index, 1);
    const jsonData = JSON.stringify(jsonParsedData, null, 2);
    fs.writeFileSync("data.json", jsonData);
    res.json({ status: true, message: "User removed successfully" });
  }
  res.status(400).json({ status: false, message: "request error" });
});

app.put("/updateUserData", (req, res) => {
  const frontendData = req.body;
  if (frontendData?.id && frontendData?.name && frontendData?.age) {
    const data = fs.readFileSync("data.json", "utf8");
    const jsonParsedData = JSON.parse(data);
    const index = jsonParsedData.findIndex(
      (item) => item.id === frontendData.id
    );
    jsonParsedData[index] = frontendData;
    const jsonData = JSON.stringify(jsonParsedData, null, 2);
    fs.writeFileSync("data.json", jsonData);
    res.json({ status: true, message: "User Updated successfully" });
  }
  res.status(400).json({ status: false, message: "request error" });
});

app.listen(5000, () => console.log("server is listening..."));
