require("dotenv").config();
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);
const callbackify = require("util").callbackify;

const _sendResponse = function(res, status_code, message) {
    res.status(parseInt(status_code));
    res.json(message);
}

const _findWithCallback = callbackify(function(offset, count) {
    return Game.find().skip(offset).limit(count).exec();
});

const getAll = function(req, res) {
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

    _findWithCallback(offset, count, function(err, games){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, games);
        }
    });
}

const _findByIdWithCallback = callbackify(function(id) {
    return Game.findById(id).exec();
});

const getOne = function(req, res) {
    _findByIdWithCallback(req.params.id, function(err, game){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, game);
        }
    });
}

const _deleteWithCallback = callbackify(function(id) {
    return Game.findByIdAndDelete(id).exec();
});

const deleteOne = function(req, res) {
    _deleteWithCallback(req.params.id, function(err, game){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, {message: process.env.GAME_DELETED_MSG});
        }
    });
}

const _addGameWithCallback = callbackify(function(newGame) {
    return Game.create(newGame);
});

const addOne = function(req, res) {
    const newGame = {
        title: req.body.title,
        price: req.body.price,
        minPlayer: req.body.minPlayer,
        maxPlayer: req.body.maxPlayer,
        minAge: req.body.minAge,
        publisher: req.body.publisher,
        designers: req.body.designers,
        rate: req.body.rate,
        year: req.body.year
    }

    _addGameWithCallback(newGame, function(err, game){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, {message: process.env.GAME_ADDED_MSG});
        }
    });
}

const _saveWithCallback = callbackify(function(game) {
    return game.save();
});

const _updateOne = function(req, res, updateCallback) {
    _findByIdWithCallback(req.params.id, function(err, game){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            updateCallback(req, res, game);
        }
    });
}

const _fullUpdateOne = function(req, res, game) {
    game.title = req.body.title;
    game.price = req.body.price;
    game.minPlayer = req.body.minPlayer;
    game.maxPlayer = req.body.maxPlayer;
    game.minAge = req.body.minAge;
    game.publisher = req.body.publisher;
    game.designers = req.body.designers;
    game.rate = req.body.rate;
    game.year = req.body.year;

    _saveWithCallback(game, function(err, updatedGame) {
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!updatedGame) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, {message: process.env.GAME_UPDATED_MSG});
        }
    });
}

const fullUpdateOne = function(req, res) {
    _updateOne(req, res, _fullUpdateOne);
}

const _partialUpdateOne = function(req, res, game) {
    if (req.body.title) game.title = req.body.title;
    if (req.body.price) game.price = req.body.price;
    if (req.body.minPlayer) game.minPlayer = req.body.minPlayer;
    if (req.body.maxPlayer) game.maxPlayer = req.body.maxPlayer;
    if (req.body.minAge) game.minAge = req.body.minAge;
    if (req.body.publisher) game.publisher = req.body.publisher;
    if (req.body.designers) game.designers = req.body.designers;
    if (req.body.rate) game.rate = req.body.rate;
    if (req.body.year) game.year = req.body.year;

    _saveWithCallback(game, function(err, updatedGame) {
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!updatedGame) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, {message: process.env.GAME_UPDATED_MSG});
        }
    });
}

const partialUpdateOne = function(req, res) {
    _updateOne(req, res, _partialUpdateOne);
}

const getPublisher = function(req, res) {
    _findByIdWithCallback(req.params.id, function(err, game){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game || !game.publisher) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, game.publisher);
        }
    });
}

const _updatePublisher = function(req, res, updatePublisherCallback) {
    _findByIdWithCallback(req.params.id, function(err, game){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            updatePublisherCallback(req, res, game);
        }
    });
}

const _fullUpdatePublisher = function(req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.established = req.body.established;
    game.publisher.country = req.body.country;

    _saveWithCallback(game, function(err, updatedGame){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, {message: process.env.GAME_PUBLISHER_UPDATED_MSG});
        }
    });
}

const fullUpdatePublisher = function(req, res) {
    _updatePublisher(req, res, _fullUpdatePublisher);
}

const _partialUpdatePublisher = function(req, res, game) {
    if (req.body.name) game.publisher.name = req.body.name;
    if (req.body.established) game.publisher.established = req.body.established;
    if (req.body.country) game.publisher.country = req.body.country;

    _saveWithCallback(game, function(err, updatedGame){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            _sendResponse(res, process.env.RESPONSE_HTTP_OK, {message: process.env.GAME_PUBLISHER_UPDATED_MSG});
        }
    });
}

const partialUpdatePublisher = function(req, res) {
    _updatePublisher(req, res, _partialUpdatePublisher);
}

const deletePublisher = function(req, res) {
    _findByIdWithCallback(req.params.id, function(err, game){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            game.publisher = null;
           _saveWithCallback(game, function(err, updatedGame){
                if (err) {
                    _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
                } else if (!game) {
                    _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
                } else {
                    _sendResponse(res, process.env.RESPONSE_HTTP_OK, {message: process.env.GAME_PUBLISHER_DELETED_MSG});
                }
            });
        }
    });
}

const addPublisher = function(req, res) {
    _findByIdWithCallback(req.params.id, function(err, game){
        if (err) {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
        } else if (!game) {
            _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
        } else {
            const publisher = {
                name: req.body.name,
                established: req.body.established,
                country: req.body.country
            }
            game.publisher = publisher;
            
           _saveWithCallback(game, function(err, updatedGame){
                if (err) {
                    _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, {message: err.message});
                } else if (!game) {
                    _sendResponse(res, process.env.RESPONSE_HTTP_NOT_FOUND, {message: process.env.RESPONSE_HTTP_NOT_FOUND_MSG});
                } else {
                    _sendResponse(res, process.env.RESPONSE_HTTP_OK, {message: process.env.GAME_PUBLISHER_ADDED_MSG});
                }
            });
        }
    });
}


module.exports = {
    getAll,
    getOne,
    addOne,
    fullUpdateOne,
    partialUpdateOne,
    deleteOne,
    getPublisher,
    addPublisher,
    fullUpdatePublisher,
    partialUpdatePublisher,
    deletePublisher
}