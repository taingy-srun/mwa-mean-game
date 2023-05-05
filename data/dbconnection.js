require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const callbackify = require("util").callbackify;

let _connection = null;

const mongoConnectWithCallback = callbackify(function(url) {
    return MongoClient.connect(url);
});

const open = function() {
    if (get() == null) {
        mongoConnectWithCallback(process.env.DB_CONNECTION_URL, function(err, client) {
            if (err) {
                console.log("Connect error: ", err);
            } else {
                _connection = client.db(process.env.DB_NAME);
                console.log("Connected");
            }
        });
    } 
}

const get = function() {
    return _connection;
}

module.exports = {
    open,
    get
}