const router = require("express").Router();
const userController = require("../controllers/users.controller");

router.route("/")
    .get(userController.getAll)
    .post(userController.register);

module.exports = router;