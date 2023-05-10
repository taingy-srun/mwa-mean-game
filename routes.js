const express = require("express");
const gameController = require("./controllers/games.controller");

const routes = express.Router();


routes.route("/games")
    .get(gameController.getAll)
    .post(gameController.addOne);

routes.route("/games/:id")
    .get(gameController.getOne)
    .put(gameController.fullUpdateOne)
    .patch(gameController.partialUpdateOne)
    .delete(gameController.deleteOne);

routes.route("/games/:id/publisher")
    .get(gameController.getPublisher)
    .post(gameController.addPublisher)
    .put(gameController.fullUpdatePublisher)
    .patch(gameController.partialUpdatePublisher)
    .delete(gameController.deletePublisher);

module.exports = routes;