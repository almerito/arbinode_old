const db = require("./db/db.js");
db.connect();

const telegram = require("./lib/telegram.js");
telegram.start();

const websocket = require("./lib/websocket.js");
