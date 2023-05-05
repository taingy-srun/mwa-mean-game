const express = require("express");
const gameController = require("./controllers/games.controller");

const routes = express.Router();


routes.route("/games")
    .get(gameController.getAll);

routes.route("/games/:id")
    .get(gameController.getGame)
    .delete(gameController.deleteGame);

module.exports = routes;