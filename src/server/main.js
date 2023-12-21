const express = require("express");
const ViteExpress = require("vite-express");
//npm i morgan
const morgan = require("morgan");
//npm i dotenv
require("dotenv").config();



const app = express();
//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.get("/hello", (req, res) => {
//   res.send("Hello Vite + React!");
// });

app.use("/api", require("./api"));
app.use("/api", require("./api/auth"));


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
