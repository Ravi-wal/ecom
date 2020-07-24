const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbConfig = require("./app/config/database");
mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

require("./app/routes/index")(app);

app.get("/", (req, res) => {
  res.json({ message: "success" });
});

 

app.listen(port, () => {
  console.log("Running at port " + port);
});
