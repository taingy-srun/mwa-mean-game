require("dotenv").config();
const gameData = require("../data/games.json");

module.exports.getAll = function(req, res) {
    console.log("GET all games received");

    let offset = 0;
    let count = 5;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    const pageData = gameData.slice(offset, offset + count);

    res.status(parseInt(process.env.RESPONSE_HTTP_OK));
    res.json(pageData);
}


module.exports.getGame = function(req, res) {
    console.log("GET one game received");

    let gameIndex = req.params.gameIndex;
    res.status(parseInt(process.env.RESPONSE_HTTP_OK));
    res.json(gameData[gameIndex]);
}