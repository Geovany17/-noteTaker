//============================================================
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
//==============================================================
// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./apiRoutes")(app);
require("./htmlRoutes")(app);
// =============================================================
// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("App listening on http://localhost:" + PORT);
});
