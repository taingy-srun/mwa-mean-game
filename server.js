require("dotenv").config();
require("./data/dbconnection");
const express = require("express");
const path = require("path");

const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to port", server.address().port);
})

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
})

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));