require('dotenv').config(); // make sure this is at the very top
console.log("MONGO_URI:", process.env.MONGO_URI); // Debug line

const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("DB Error", err);
        process.exit(1);
    }
};

module.exports = connectDb;
