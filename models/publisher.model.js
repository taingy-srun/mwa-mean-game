const mongoose = require("mongoose");

module.exports.publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: String,
    established: Number
});