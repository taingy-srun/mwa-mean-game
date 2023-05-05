require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let _connection = null;

const open = function() {
    if (get() == null) {
        MongoClient.connect(process.env.DB_CONNECTION_URL, function(err, client) {
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