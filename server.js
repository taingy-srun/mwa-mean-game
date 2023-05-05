require("./data/dbconnection").open();
const express = require("express");
const path = require("path");
require("dotenv").config();

const routes = require("./routes");

const app = express();

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to port", server.address().port);
})

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
})

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));