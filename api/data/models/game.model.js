const mongoose = require("mongoose");
const publisherSchema = require("./publisher.model").publisherSchema;

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    designers: [String],
    publisher: publisherSchema
});

mongoose.model(process.env.GAME_MODEL, gameSchema, process.env.GAME_COLLECTION);