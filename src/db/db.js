// Mongodb Atlas
const mongoose = require("mongoose");
const password = process.env.mongodb_atlas;
const dbname = "arbi";
const url = `mongodb+srv://maximilian:${password}@cluster0.t8aq3.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
const orderbookDocument = {
  buyExchange: String,
  sellExchange: String,
  market: String,
  buyPrice: Number,
  sellPrice: Number,
  buyFee: Number,
  sellFee: Number,
  maxAmount: Number,
  spread: Number,
  spreadP: Number,
  age: Number
};
const orderbookSchema = new mongoose.Schema(orderbookDocument, {
  timestamps: true
});
const orderbookModel = mongoose.model("orderbook", orderbookSchema);

const db = {
  connected: false,
  connect: () => {
    connect();
  },
  orderbook: {
    document: orderbookDocument,
    write: (document) => {
      writeOrderbook(document);
    },
    read: () => {}
  }
};

async function connect() {
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      db.connected = true;
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
      process.exit(1);
    });
}

async function writeOrderbook(document) {
  // Saves to db
  let model = new orderbookModel(document);

  model.save(function (err, fluffy) {
    if (err) return console.error(err);
  });
}

module.exports = db;
