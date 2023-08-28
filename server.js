const express = require("express");
const Note = require("./model/note");
const mongoose = require("mongoose");

const url =
  "mongodb+srv://moodghoz:cGocmiQKmguaoP4q@cluster0.uojnwjd.mongodb.net/notekeeper?retryWrites=true&w=majority";

const app = express();

//connect with cluster in mongo atlas
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mahmoud");
  })

  .catch((e) => {
    console.log(`Error: ${e.message}`);
  });

//parse request to json
app.use(express.json());

//get all notes
app.get("/notes", async (req, res) => {
  let { title, content} = req.query;
 
  if (!title) {
    title = "";
  }

  if (!content) {
    content = "";
  }
  let notes = await Note.find({
    title: { $regex: title },
    content: { $regex: content },
  })
  res.status(200).json(notes);
});

//get note by id
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    res.status(200).json(note);
  } catch (e) {
    res.status(404).json("Invalid ID");
  }
});

//create note
app.post("/notes", async (req, res) => {
  const note = req.body;
  console.log(note);
  const { title, content } = req.body;
  const createdNote = new Note(note);
  await createdNote.save();
  res.status(200).json(createdNote);
});

//delete note by id
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    res.status(200).json(note);
  } catch (e) {
    res.status(404).json("Invalid ID");
  }
});

//update note by id
app.put("/notes/:id", async (req, res) => {
  try {
    const note = req.body;
    const { id } = req.params;
    await Note.findByIdAndUpdate(id, note);
    res.status(200).json(note);
  } catch (e) {
    res.status(404).json("Invalid ID");
  }
});

//listen to port 3000
app.listen(3000, () => {
  console.log("app is listening ");
});
