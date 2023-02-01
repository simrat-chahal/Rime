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
    .catch((err) => console.log("catch block")))();

app.get("/users", async (req, res) => {
  setTimeout(async () => {
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
  }, 3000);
});

app.get("/users/:userId", async (req, res) => {
  try {
    const payloadData = req.query;
    const result = await StudentModel.find({ _id: payloadData._id });
    if (result.length) {
      res.status(200).send({ status: true, data: result[0] });
    } else {
      res.status(404).send({
        status: false,
        message: "Sorry! Data is not found for given user",
      });
    }
  } catch (error) {
    res.status(500).send({ status: false, errorInformation: error });
  }
});

app.put("/update-user-data", async (req, res) => {
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

app.post("/add-user", async (req, res) => {
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

app.delete("/delete-user", async (req, res) => {
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

app.delete("/delete-all", async (req, res) => {
  try {
    const result = await StudentModel.deleteMany({
      name: { $ne: "630faadc0d3537896ac7863y" },
    });
    if (result.deletedCount === 0) {
      res
        .status(400)
        .json({ status: false, message: "To be deleted user is not found" });
    }
    res.status(200).json({
      status: true,
      message: "all users deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, errorInformation: error.message });
  }
});

app.listen(5000, () => console.log("server is listening..."));
