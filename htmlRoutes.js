const express = require("express");
const path = require("path");

module.exports = (app) => {
  //=============================
  // GET Requests
  //=============================

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
};
