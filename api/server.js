const express = require("express");

const eventController = require("./Controller/eventsController");

var app = express();

app.listen(3095, () => {
  console.log("Hey Im Working at 3095");
});

app.use(express.json());

app.use("/event/", eventController);
