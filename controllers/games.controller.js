require("dotenv").config();
const dbConnection = require("../data/dbconnection");
const mongodb = require("mongodb");

module.exports.getAll = function(req, res) {
    console.log("GET all games received");

    let offset = 0;
    let count = 3;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > 8) {
            count = 8;
        }
    }
    const db = dbConnection.get();
    const gameCollection = db.collection("games");
   
    gameCollection.find().skip(offset).limit(count).toArray().then(function(games){
        res.status(parseInt(process.env.RESPONSE_HTTP_OK));
        res.json(games);
    }).catch(function(err) {
        console.log("Get games err:", err);
        res.status(parseInt(process.env.RESPONSE_HTTP_SERVER_ERROR));
        res.json({message: process.env.RESPONSE_HTTP_SERVER_ERROR_MSG});
    });
}


module.exports.getGame = function(req, res) {
    console.log("GET one game received");

    const db = dbConnection.get();
    const gameCollection = db.collection("games");
   
    const id = req.params.id;
    gameCollection.find({_id: new mongodb.ObjectId(`${id}`)}).toArray().then(function(games){
        res.status(parseInt(process.env.RESPONSE_HTTP_OK));
        res.json(games);
    }).catch(function(err) {
        console.log("Get one game err:", err);
        res.status(parseInt(process.env.RESPONSE_HTTP_SERVER_ERROR));
        res.json({message: process.env.RESPONSE_HTTP_SERVER_ERROR_MSG});
    });
}

module.exports.deleteGame = function(req, res) {
    console.log("DELETE game received");

    const db = dbConnection.get();
    const gameCollection = db.collection("games");
   
    const id = req.params.id;
    gameCollection.deleteOne({_id: new mongodb.ObjectId(`${id}`)}).then(function(game){
        if (game.deletedCount == 0) {
            res.status(parseInt(process.env.RESPONSE_HTTP_NOT_FOUND_MSG));
            res.json({message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        }
        res.status(parseInt(process.env.RESPONSE_HTTP_OK));
        res.json({message: process.env.RESPONSE_HTTP_OK_MSG});
    }).catch(function(err) {
        console.log("delete game err:", err);
        res.status(parseInt(process.env.RESPONSE_HTTP_SERVER_ERROR));
        res.json({message: process.env.RESPONSE_HTTP_SERVER_ERROR_MSG});
    });
}