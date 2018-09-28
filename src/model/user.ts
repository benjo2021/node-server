import { Schema, model } from "mongoose";

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

export class User {
  model: any;
  constructor() {
    this.model = model("User", genreSchema);
  }

  getUsers(cb: any, limit?: any) {
    this.model.find(cb).limit(limit);
  }

  addUsers(genre: any, cb: any) {
    this.model.create(genre, cb);
  }

  updateUsers(id: any, genre: any, options: any, cb: any) {
    var query = { _id: id };
    var update = {
      name: genre.name,
    };
    this.model.findOneAndUpdate(query, update, options, cb);
  }
}
