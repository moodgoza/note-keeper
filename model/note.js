const mongoose = require("mongoose");
const { Schema } = mongoose;
const noteSchema = new Schema({
  title: {
    type: String,
  },

  content: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

let Note = mongoose.model("Note", noteSchema, "notes");
module.exports = Note