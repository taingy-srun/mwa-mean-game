require("dotenv").config();
const dbConnection = require("../data/dbconnection");
const { ObjectId } = require("mongodb");

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
   
    gameCollection.find().skip(offset).limit(count).toArray(function(err, games){
        if (err) {
            console.log("Get games err:", err);
            res.status(parseInt(process.env.RESPONSE_HTTP_SERVER_ERROR));
            res.json({message: process.env.RESPONSE_HTTP_SERVER_ERROR_MSG});
        }
        res.status(parseInt(process.env.RESPONSE_HTTP_OK));
        res.json(games);
    });
}


module.exports.getGame = function(req, res) {
    console.log("GET one game received");

    const db = dbConnection.get();
    const gameCollection = db.collection("games");
   
    const id = req.params.id;
    gameCollection.find({_id: ObjectId(id)}).toArray(function(err, games){
        if (err) {
            console.log("Get one game err:", err);
            res.status(parseInt(process.env.RESPONSE_HTTP_SERVER_ERROR));
            res.json({message: process.env.RESPONSE_HTTP_SERVER_ERROR_MSG});
        }
        res.status(parseInt(process.env.RESPONSE_HTTP_OK));
        res.json(games);
    });
}

module.exports.deleteGame = function(req, res) {
    console.log("DELETE game received");

    const db = dbConnection.get();
    const gameCollection = db.collection("games");
   
    const id = req.params.id;
    gameCollection.deleteOne({_id: ObjectId(`${id}`)}, function(err, game){
        if (err) {
            console.log("delete game err:", err);
            res.status(parseInt(process.env.RESPONSE_HTTP_SERVER_ERROR));
            res.json({message: process.env.RESPONSE_HTTP_SERVER_ERROR_MSG});
        }
        if (game.deletedCount == 0) {
            res.status(parseInt(process.env.RESPONSE_HTTP_NOT_FOUND));
            res.json({message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            res.status(parseInt(process.env.RESPONSE_HTTP_OK));
            res.json({message: process.env.RESPONSE_HTTP_OK_MSG});
        }
    });
}


module.exports.addGame = function(req, res) {
    console.log("POST game received");

    let title, price, minPlayer, maxPlayer, minAge;

    console.log(req.body);
    if(!req.body.title) {
        res.status(parseInt(process.env.RESPONSE_HTTP_BAD_REQUEST));
        res.json({message: "Title is required!"});
    }
    title = req.body.title;

    if(!req.body.price) {
        res.status(parseInt(process.env.RESPONSE_HTTP_BAD_REQUEST));
        res.json({message: "Price is required!"});
    }
    price = req.body.price;

    if(!req.body.minPlayer) {
        res.status(parseInt(process.env.RESPONSE_HTTP_BAD_REQUEST));
        res.json({message: "Min Number of players is required!"});
    }
    minPlayer = parseInt(req.body.minPlayer);
    if (minPlayer < parseInt(process.env.MIN_NUM_PLAYERS)) {
        res.status(parseInt(process.env.RESPONSE_HTTP_BAD_REQUEST));
        res.json({message: `Number of players must be between ${process.env.MIN_NUM_PLAYERS} and ${process.env.MAX_NUM_PLAYERS}!`});
    }
    if(!req.body.maxPlayer) {
        res.status(parseInt(process.env.RESPONSE_HTTP_BAD_REQUEST));
        res.json({message: "Max Number of players is required!"});
    }
    maxPlayer = parseInt(req.body.maxPlayer);
    if (minPlayer > parseInt(process.env.MAX_NUM_PLAYERS)) {
        res.status(parseInt(process.env.RESPONSE_HTTP_BAD_REQUEST));
        res.json({message: `Number of players must be between ${process.env.MIN_NUM_PLAYERS} and ${process.env.MAX_NUM_PLAYERS}!`});
    }

    if(!req.body.minAge) {
        res.status(parseInt(process.env.RESPONSE_HTTP_BAD_REQUEST));
        res.json({message: "Min Age is required!"});
    }
    minAge = parseInt(req.body.minAge);
    if (minAge < parseInt(process.env.MIN_AGE) || minAge > parseInt(process.env.MAX_AGE)) {
        res.status(parseInt(process.env.RESPONSE_HTTP_BAD_REQUEST));
        res.json({message: `Age must be between ${process.env.MIN_AGE} and ${process.env.MAX_AGE}!`});
    }

    const db = dbConnection.get();
    const gameCollection = db.collection("games");
   
    gameCollection.insertOne({"title": title, "price": price, "minPlayer": minPlayer, "maxPlayer": maxPlayer, "minAge": minAge}, function(err, game){
        if (err) {
            console.log("Get games err:", err);
            res.status(parseInt(process.env.RESPONSE_HTTP_SERVER_ERROR));
            res.json({message: process.env.RESPONSE_HTTP_SERVER_ERROR_MSG});

        } else {
            res.status(parseInt(process.env.RESPONSE_HTTP_OK));
            res.json({message: game});

        }
    });
}

