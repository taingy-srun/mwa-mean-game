const router = require("express").Router();
const gameRouter = require("./games.routes");
const userRouter = require("./users.routes");

router.use("/games", gameRouter);
router.use("/users", userRouter);

module.exports = router;