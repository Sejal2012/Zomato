const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = require("./connector");

app.get("/api/orders", (req, res) => {
  connection.query("select * from orders limit 10 offset 0", (err, result, next) => {
    if (err) {
        res.status(400).json({ message: "400 bad request" });
        next();
    } else {
        res.status(200).json(result);
    }
  });
});

app.get("/api/orders/:lim/:off", (req, res) => {
    connection.query("select * from orders limit "+req.params.lim+" offset "+req.params.off, (err, result, next) => {
      if (err) {
          res.status(400).json({ message: "400 bad request" });
          next();
      } else {
          res.status(200).json(result);
      }
    });
  });

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
