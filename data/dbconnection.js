require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let _connection = null;

const open = function() {
    if (get() == null) {
        MongoClient.connect(process.env.DB_CONNECTION_URL).then(function(client) {
            _connection = client.db(process.env.DB_NAME);
            console.log("DB connected");
        }).catch(function(err) {
            console.log("Connect failed", err);
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