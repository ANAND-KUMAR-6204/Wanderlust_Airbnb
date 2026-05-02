const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://anandkumar6204aa_db_user:anand123@cluster0.7p5mw6i.mongodb.net/wonderlust";

main()
.then(async () => {
    console.log("connected to db");
    await initDB();
    await mongoose.connection.close();
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};