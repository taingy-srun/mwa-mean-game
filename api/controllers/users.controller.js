const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model(process.env.USER_MODEL);

const _sendResponse = function(res, status_code, message) {
    res.status(parseInt(status_code));
    res.json(message);
}

const getAll = function(req, res) {
    User.find().exec().then(function(users) {
        _sendResponse(res, process.env.RESPONSE_HTTP_OK, users);
    }).catch(function(err) {
        _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, { message: err.message });
    });
}

const addOne = function(req, res) {
    if (req.body) {
        bcrypt.genSalt().then((salt) => {
            bcrypt.hash(req.body.password, salt).then((passwordHash) => {
                const newUser = {
                    name: req.body.name,
                    username: req.body.username,
                    password: passwordHash
                }
                User.create(newUser).then(function(user) {
                    _sendResponse(res, process.env.RESPONSE_HTTP_OK, user);
                }).catch(function(err) {
                    _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, { message: err.message });
                });
            }).catch((err) => {
                _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR,{ message: err.message });
            });
        }).catch((err) => {
            _sendResponse(res, process.env.RESPONSE_HTTP_SERVER_ERROR, { message: err.message });
        });
    } else {
        _sendResponse(res, process.env.RESPONSE_HTTP_BAD_REQUEST, { message: process.env.MISSING_REQUEST_BODY_MSG });
    }
}

module.exports = {
    getAll,
    register: addOne
}