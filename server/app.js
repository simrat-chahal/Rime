const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const StudentModel = require("./models/Student");
app.use(cors());
app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

(async () =>
  await mongoose
    .connect("mongodb://localhost:27017/myapp")
    .catch((err) => console.log("catch bloc")))();

app.get("/users", async (req, res) => {
  try {
    const result = await StudentModel.find();
    if (result.length) {
      res.status(200).send({ status: true, data: result });
    } else {
      res.status(200).send({ status: false, message: "No data is found" });
    }
  } catch (error) {
    res.status(500).send({ status: false, errorInformation: error });
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const payloadData = req.query;
    const result = await StudentModel.find({ _id: payloadData._id });
    if (result.length) {
      res.status(200).send({ status: true, data: result[0] });
    } else {
      res
        .status(404)
        .send({
          status: false,
          message: "Sorry! Data is not found for given user",
        });
    }
  } catch (error) {
    res.status(500).send({ status: false, errorInformation: error });
  }
});

app.put("/updateUserData", async (req, res) => {
  const payloadData = req.body;
  try {
    const result = await StudentModel.updateOne(
      { _id: payloadData._id },
      payloadData
    );
    if (result.matchedCount) {
      res.status(200).send({
        status: true,
        data: payloadData,
        message: "User updated successfully",
      });
    } else {
      res
        .status(404)
        .send({ status: false, message: "Data is not found for provided id" });
    }
  } catch (error) {
    res.status(500).send({ status: false, errorInformation: error });
  }
});

app.post("/addUser", async (req, res) => {
  try {
    const result = await StudentModel.insertMany([req.body]);
    res.status(201).json({
      status: true,
      message: "User added successfully",
      data: result[0],
    });
  } catch (error) {
    res.status(500).send({ status: false, errorInformation: error });
  }
});

app.delete("/removeUser", async (req, res) => {
  try {
    const result = await StudentModel.deleteOne({ _id: req.body._id });
    if (result.deletedCount === 0) {
      res
        .status(400)
        .json({ status: false, message: "To be deleted user is not found" });
    }
    res.status(200).json({
      status: true,
      message: "User removed successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({ status: false, errorInformation: error });
  }
});

app.listen(5000, () => console.log("server is listening..."));
