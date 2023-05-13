require("dotenv").config();
require("./api/data/dbconnection");
const express = require("express");

const routes = require("./api/routes");

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

app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, DELETE");
    next();
})
app.use("/api", routes);