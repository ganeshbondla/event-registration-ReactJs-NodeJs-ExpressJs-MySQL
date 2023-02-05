const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nani_events",
});

conn.connect((error) => {
  if (error) {
    console.log("Connection Failed");
  } else {
    console.log("Connection Success");
  }
});

module.exports = conn;
