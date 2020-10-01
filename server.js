// Dependencies
// =============================================================
const express = require("express");
// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 8000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./apiRoutes")(app);
require("./htmlRoutes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
