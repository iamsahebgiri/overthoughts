const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    time: new Date(),
    server: process.env.SERVER_NO ?? -1,
  });
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
