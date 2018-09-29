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
const conn =
  "mongodb://test:test123@test-shard-00-00-bfhcp.mongodb.net:27017,test-shard-00-01-bfhcp.mongodb.net:27017,test-shard-00-02-bfhcp.mongodb.net:27017/test?ssl=true&replicaSet=Test-shard-0&authSource=admin&retryWrites=true";
mongoose.connect(
  conn,
  { useNewUrlParser: true }
);
const db = mongoose.connection;

app.use((req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    // Intercept OPTIONS method
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,PUT,DELETE");
      res.send(200);
    } else {
      next();
    }
  });
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
app.delete("/api/user/:_id", (req, res) => {
    var id = req.params._id;
	user.deleteUser(id, (err, genre) => {
		if(err){
			res.json(err);
		}
		res.json({message : "Delete successful!!!"});
	});
});

app.listen(3000, () => console.log("Listening on port 3000..."));
