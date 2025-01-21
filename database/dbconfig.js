const mongoose = require('mongoose');
const dotenv =  require('dotenv');
dotenv.config();
const connection_string = process.env.DATABASE_STRIBG;

const Connection = async (username, password) => {
    //const URL = `mongodb://localhost:27017/rsa`
    const URL = connection_string;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

module.exports = Connection;