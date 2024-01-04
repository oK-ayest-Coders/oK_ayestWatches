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

//this is router for authenticating the api
const apiRouter = require("./api/auth"); 
// putting the router on the correct path
app.use("/api", apiRouter);




ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
