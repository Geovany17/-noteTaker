const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  //==========================
  // API GET Requests
  //===========================
  //saved notes as JSON
  //===========================
  app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (error, data) {
      res.json(JSON.parse(data));
    });
  });

  //=============================
  // API POST Requests
  //===================================================================================
  //  receive and push newNote to the db.json file, and then return the new note created
  //===================================================================================
  app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    fs.readFile("db/db.json", "utf8", function (error, data) {
      var data = JSON.parse(data);
      data.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(data), function (error) {
        if (error) throw error;
        console.log("Written Successfully");
      });
    });

    res.json(newNote);
  });
  //=========================================================
  // Delete and rewrite the notes to the db.json file.
  //=========================================================
  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (error, data) {
      let noteId = req.params.id;
      let noteData = JSON.parse(data);

      noteData = noteData.filter(function (note) {
        if (noteId != note.id) {
          return true;
        } else {
          return false;
        }
      });

      fs.writeFile("db/db.json", JSON.stringify(noteData), function (error) {
        if (error) throw error;
        res.end(console.log("Deleted Successfully"));
      });
    });
  });
};
