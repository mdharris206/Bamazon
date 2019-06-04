const express = require("express");
const db = require("./models")


// Express app

var app = express();
var PORT = process.env.PORT || 5000;

//Express data parse

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//For static
app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
