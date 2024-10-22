const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("DB Connection successful");
    } catch (err) {
        console.error("DB Connection failed:", err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
