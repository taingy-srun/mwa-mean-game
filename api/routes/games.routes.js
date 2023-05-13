const routes = require("express").Router();
const gameController = require("../controllers/games.controller");

routes.route("/")
    .get(gameController.getAll)
    .post(gameController.addOne);

routes.route("/:id")
    .get(gameController.getOne)
    .put(gameController.fullUpdateOne)
    .patch(gameController.partialUpdateOne)
    .delete(gameController.deleteOne);

routes.route("/:id/publisher")
    .get(gameController.getPublisher)
    .post(gameController.addPublisher)
    .put(gameController.fullUpdatePublisher)
    .patch(gameController.partialUpdatePublisher)
    .delete(gameController.deletePublisher);

module.exports = routes;