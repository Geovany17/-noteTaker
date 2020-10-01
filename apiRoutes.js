const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = (app) => {
  //==========================
  // API GET Requests
  //===========================
  //saved notes as JSON
  //===========================
  app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (error, data) => {
      res.json(JSON.parse(data));
    });
  });

  //=============================
  // API POST Requests
  //===================================================================================
  //  receive and push newNote to the db.json file, and then return the new note created
  //===================================================================================
  app.post("/api/notes", (req, res) => {
    var newNote = req.body;

    fs.readFile("db/db.json", "utf8", (error, data) => {
      var data = JSON.parse(data);

      data.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(data), (error) => {
        if (error) throw error;
        console.log("Written Successfully");
      });
    });

    res.json(newNote);
  });
  //=========================================================
  // Delete and rewrite the notes to the db.json file.
  //=========================================================
  app.delete("/api/deleteNotes/:id", (req, res) => {
    fs.readFile("db/db.json", "utf8", (error, data) => {
      let noteId = req.params.id;
      let noteData = JSON.parse(data);

      noteData = noteData.filter((note) => {
        if (noteId != note.id) {
          return true;
        } else {
          return false;
        }
      });

      fs.writeFile("db/db.json", JSON.stringify(noteData), (error) => {
        if (error) throw error;
        res.end(console.log("Deleted Successfully"));
      });
    });
  });
};
// app.post("api/deleteNote/:id", function (req, res) {
//   console.log(req.params.id);
//   const deleteNotes = note.filter((note) => note.id != req.params.id);
//   note = deleteNotes;
//   return res.redirect("/");
// });
