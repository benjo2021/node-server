import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import { User } from "./model/user";

const app = express(),
  user = new User();
app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
// app.use(morgan("dev"));

// Connect to Mongoose
mongoose.connect(
  "mongodb://localhost/test",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

// ROUTES
app.get("/", (req, res) => {
  res.status(404).json({ message: "Invalid route/s!!!" });
});

app.get("/api/user", (req, res) => {
  user.getUsers((err: any, user: any) => {
    if (err) {
      res.json(err);
    }
    res.json(user);
  });
});

app.post("/api/user", (req, res) => {
  var User = req.body;
  user.addUsers(User, (err: any, user: any) => {
    if (err) {
      res.json(err);
    }
    res.json(user);
  });
});

app.put("/api/user/:_id", (req, res) => {
  var id = req.params._id;
  var User = req.body;
  user.updateUsers(id, User, {}, (err: any, user: any) => {
    if (err) {
      res.json(err);
    }
    res.json(user);
  });
});

// FOR TEST
app.delete("/api/user/:_id", (req, res) => {});

app.listen(3000, () => console.log("Listening on port 3000..."));
