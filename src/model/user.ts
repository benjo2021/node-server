import { Schema, model } from "mongoose";

const genreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
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
    const query = { _id: id },
      { name, type, password, username } = genre,
      update = {
        name,
        type,
        password,
        username
      };
    this.model.findOneAndUpdate(query, update, options, cb);
  }

  deleteUser(id, cb) {
    var query = { _id: id };
    this.model.remove(query, cb);
  }
}
